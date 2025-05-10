import app from './app';
import mongoConnect from './utils/db';
import WebSocket from 'ws';
import deviceModel from './api/models/deviceModel';
import logger from './logger';

const port = process.env.PORT || 3000;

let wss: WebSocket.Server;

export function initializeWebSocket(server: any) {
  try {
    wss = new WebSocket.Server({server});
    logger.info('WebSocket server initialized');

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
      ws.on('close', () => {
        console.log('WebSocket client disconnected');
      });
      ws.on('error', (error) => {
        console.error('WebSocket error', (error as Error).message);
      });
    });
  } catch (error) {
    logger.error('WebSocket server error', (error as Error).message);
    throw error;
  }
}

export function broadcast(data: object) {
  if (!wss) return;
  console.log('Broadcasting data:', data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify(data));
      } catch (error) {
        console.error('Error broadcasting data', (error as Error).message);
      }
    }
  });
}

(async () => {
  try {
    const db = await mongoConnect();
    if (!db) {
      throw new Error('Database error');
    }
    const server = app.listen(port, () => {
      logger.info(`Listening: http://localhost:${port}`);
    });

    initializeWebSocket(server);

    function startChangeStream() {
      const changeStream = deviceModel.collection.watch([], {
        fullDocument: 'updateLookup',
      });

      changeStream.on('change', (change) => {
        if (change.operationType === 'update') {
          const updatedData =
            change.fullDocument?.data ||
            change.updateDescription.updatedFields?.data;

          if (wss && wss.clients.size > 0 && updatedData) {
            broadcast({
              event_type: 'mongodb_change_stream',
              data: updatedData,
              last_updated: new Date(),
            });
          }
        }
      });

      changeStream.on('error', (error) => {
        console.error('Change stream error', (error as Error).message);
        changeStream.close();
        setTimeout(startChangeStream, 1000);
      });
    }

    //  startChangeStream();

    console.log('WebSocket server and MongoDB change stream initialized');
  } catch (error) {
    console.error('Server error', (error as Error).message);
  }
})();

import app from './app';
import mongoConnect from './utils/db';
import WebSocket from 'ws';
import deviceModel from './api/models/deviceModel';
import logger from './logger';

const port = process.env.PORT || 3000;

(async () => {
  try {
    const db = await mongoConnect();
    if (!db) {
      throw new Error('Database error');
    }
    const server = app.listen(port, () => {
      logger.info(`Listening: http://localhost:${port}`);
    });

    let wss: WebSocket.Server;
    try {
      wss = new WebSocket.Server({server});
      logger.info('WebSocket server initialized');
    } catch (error) {
      logger.error('WebSocket server error', (error as Error).message);
      return;
    }

    function broadcast(data: object) {
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

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected');
      ws.on('close', () => {
        console.log('WebSocket client disconnected');
      });
      ws.on('error', (error) => {
        console.error('WebSocket error', (error as Error).message);
      });
    });

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

    startChangeStream();

    console.log('WebSocket server and MongoDB change stream initialized');
  } catch (error) {
    console.error('Server error', (error as Error).message);
  }
})();

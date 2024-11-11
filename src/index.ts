import app from './app';
import mongoConnect from './utils/db';
import WebSocket from 'ws';
import deviceModel from './api/models/deviceModel';

const port = process.env.PORT || 3000;

(async () => {
  try {
    const db = await mongoConnect();
    if (!db) {
      throw new Error('Database error');
    }
    const server = app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });

    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });

    function broadcast(data: object) {
      console.log('Broadcasting data:', data);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }

    const changeStream = deviceModel.collection.watch([], {
      fullDocument: 'updateLookup',
    });

    changeStream.on('change', (change) => {
      if (change.operationType === 'update') {
        const updatedData =
          change.fullDocument?.data ||
          change.updateDescription.updatedFields?.data;

        if (wss.clients.size > 0 && updatedData) {
          broadcast({
            data: updatedData,
            last_updated: new Date(),
          });
        }
      }
    });

    console.log('WebSocket server and MongoDB change stream initialized');
  } catch (error) {
    console.error('Server error', (error as Error).message);
  }
})();

import express from 'express';
import devicesRoute from './routes/devicesRoute';
import { MessageResponse } from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});

// Mount the devices routes
router.use('/devices', devicesRoute);

export default router;
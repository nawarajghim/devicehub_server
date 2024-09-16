import express from 'express';
import deviceDataRoute from './routes/deviceDataRoute';
import deviceClassRoute from './routes/deviceClassRoute';
import devicesRoute from './routes/devicesRoute';
import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});
router.use('/devices', devicesRoute)
router.use('/devicedata', deviceDataRoute);
router.use('/deviceclasses', deviceClassRoute);

export default router;
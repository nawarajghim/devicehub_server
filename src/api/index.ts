import express from 'express';
import deviceDataRoute from './routes/deviceDataRoute';
import deviceTypeRoute from './routes/deviceTypeRoute';

import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});

router.use('/devicedata', deviceDataRoute);
router.use('/devicetypes', deviceTypeRoute);

export default router;

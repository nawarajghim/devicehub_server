import express from 'express';

import {MessageResponse} from '../types/MessageTypes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'API location: api/v1',
  });
});

export default router;

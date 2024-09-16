import express from 'express';
import { getDeviceByName, getDevices, getDevicesByType } from '../controllers/devicesController';

const router = express.Router();

router.route('/').get(getDevices);
router.use('/devices/:name', getDeviceByName);
router.use('/devices/:type', getDevicesByType);

export default router;
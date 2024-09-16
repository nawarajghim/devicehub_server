import express from 'express';
import {getDeviceTypes} from '../controllers/deviceTypeController';

const router = express.Router();

router.route('/').get(getDeviceTypes);

export default router;

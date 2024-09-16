import express from 'express';
import {getDeviceTypeByName, getDeviceTypes} from '../controllers/deviceTypeController';

const router = express.Router();

router.route('/').get(getDeviceTypes);
router.route('/:name').get(getDeviceTypeByName);

export default router;

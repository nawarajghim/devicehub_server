import express from 'express';
import {getDeviceData, getDeviceDataList, postDeviceData} from '../controllers/deviceDataController';

const router = express.Router();

router.route('/').get(getDeviceDataList);
router.route('/:deviceId').get(getDeviceData);
router.route('/').post(postDeviceData);

export default router;
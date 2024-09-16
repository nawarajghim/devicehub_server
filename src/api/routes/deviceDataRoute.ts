import express from 'express';
import {
  deleteDeviceData,
  getDeviceData,
  getDeviceDataList,
  postDeviceData,
  putDeviceData,
} from '../controllers/deviceDataController';

const router = express.Router();

router.route('/').get(getDeviceDataList).post(postDeviceData);

router
  .route('/:deviceId')
  .get(getDeviceData)
  .put(putDeviceData)
  .delete(deleteDeviceData);

export default router;

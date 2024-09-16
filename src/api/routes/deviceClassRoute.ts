import express from 'express';
import {
    deleteDeviceClass,
  getDeviceClassByName,
  getDeviceClasses,
  postDeviceClass,
  putDeviceClass,
} from '../controllers/deviceClassController';

const router = express.Router();

router.route('/').get(getDeviceClasses).post(postDeviceClass);
router.route('/:name').get(getDeviceClassByName).put(putDeviceClass).delete(deleteDeviceClass);

export default router;

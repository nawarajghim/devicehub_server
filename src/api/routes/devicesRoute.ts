import express from 'express';
import {
  addDevice,
  deleteDeviceByName,
  getDeviceByName,
  getDevices,
  getDevicesByLocation,
  getDevicesByType,
  getDevicesByClass,
  updateDeviceByName,
} from '../controllers/devicesController';

const router = express.Router();

/**
 * @api {get} /devices Get devices
 * @apiName GetDevices
 * @apiGroup Devices
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object[]} data Array of device objects
 * @apiSuccess {String} data.name Name of the device
 * @apiSuccess {String} data.deviceClass Class of the device
 * @apiSuccess {String} data.deviceType Type of the device
 * @apiSuccess {String} data.location Location of the device
 * @apiSuccess {String} data.settings Settings of the device
 * @apiSuccess {String} data.status Status of the device
 * @apiSuccess {Object} data.data Data object
 * @apiSuccess {String} data.data.key Key of the data object
 * @apiSuccess {String} data.data.value Value of the data object
 * @apiSuccess {Date} data.last_updated Last updated date
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 * {
 * "name": "RuuviTag",
 * "deviceClass": "Meter",
 * "deviceType": "Multifunctional Sensor",
 * "location": "Alternating",
 * "settings": "Default",
 * "status": "Active",
 * "data": {
 * "humidity": "32.59",
 * "temperature": "19.87",
 * "pressure": "1970.62"
 * },
 * "last_updated": "2024-11-21T11:54:07.914+00:00"
 * }
 * ]
 *  
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 * 
 * 
 */

// Route to get all devices
router.get('/', getDevices);

// Route to get a device by name
router.get('/name/:name', getDeviceByName);

// Route to get devices by class
router.get('/class/:class', getDevicesByClass);

// Route to get devices by type
router.get('/deviceType/:deviceType', getDevicesByType);

// Route to get devices by location
router.get('/location/:location', getDevicesByLocation);

// Route to add a new device
router.post('/', addDevice);

// Route to delete a device by name
router.delete('/name/:name', deleteDeviceByName);

// Route to update a device by name
router.put('/name/:name', updateDeviceByName);

export default router;

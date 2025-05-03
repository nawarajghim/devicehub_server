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
  updateDeviceById,
  getDeviceById,
  updateDataField,
  newDeviceAlert,
} from '../controllers/devicesController';

const router = express.Router();

/**
 * @api {get} /devices Get devices
 * @apiName GetDevices
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} data Array of device objects
 * @apiSuccess {String} data._id Id of the device
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
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
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

/**
 * @api {get} /devices/name/:name Get device by name
 * @apiName GetDeviceByName
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of the device
 *
 * @apiSuccess {String} _id Id of the device
 * @apiSuccess {String} name Name of the device
 * @apiSuccess {String} deviceClass Class of the device
 * @apiSuccess {String} deviceType Type of the device
 * @apiSuccess {String} location Location of the device
 * @apiSuccess {String} settings Settings of the device
 * @apiSuccess {String} status Status of the device
 * @apiSuccess {Object} data Data object
 * @apiSuccess {String} data.key Key of the data object
 * @apiSuccess {String} data.value Value of the data object
 * @apiSuccess {Date} last_updated Last updated date
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
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
 *
 * @apiError (Error 404) NotFound Device not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 */

// Route to get a device by name
router.get('/name/:name', getDeviceByName);

router.get('/:id', getDeviceById);

router.put('/:id', updateDeviceById);

router.put('/recent/:id', updateDataField);

/**
 * @api {get} /devices/class/:class Get devices by class
 * @apiName GetDevicesByClass
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} class Class of the device
 *
 * @apiSuccess {Object[]} data Array of device objects
 * @apiSuccess {String} data._id Id of the device
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
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
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
 * @apiError (Error 404) NotFound Device not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 */

// Route to get devices by class
router.get('/class/:class', getDevicesByClass);

/**
 * @api {get} /devices/deviceType/:deviceType Get devices by type
 * @apiName GetDevicesByType
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} deviceType Type of the device
 *
 * @apiSuccess {Object[]} data Array of device objects
 * @apiSuccess {String} data._id Id of the device
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
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
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
 * @apiError (Error 404) NotFound Device not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 *
 */

// Route to get devices by type
router.get('/deviceType/:deviceType', getDevicesByType);

/**
 * @api {get} /devices/location/:location Get devices by location
 * @apiName GetDevicesByLocation
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} location Location of the device
 *
 * @apiSuccess {Object[]} data Array of device objects
 * @apiSuccess {String} data._id Id of the device
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
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
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
 * @apiError (Error 404) NotFound Device not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 */

// Route to get devices by location
router.get('/location/:location', getDevicesByLocation);

/**
 * @api {post} /devices Add a new device
 * @apiName AddDevice
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of the device
 * @apiParam {String} deviceClass Class of the device
 * @apiParam {String} deviceType Type of the device
 * @apiParam {String} location Location of the device
 * @apiParam {String} settings Settings of the device
 * @apiParam {String} _id Id of the device
 * @apiParam {String} status Status of the device
 * @apiParam {Number} __v Version of the device
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Data object
 * @apiSuccess {String} data.name Name of the device
 * @apiSuccess {String} data.deviceClass Class of the device
 * @apiSuccess {String} data.deviceType Type of the device
 * @apiSuccess {String} data.location Location of the device
 * @apiSuccess {String} data.settings Settings of the device
 * @apiSuccess {String} data._id Id of the device
 * @apiSuccess {String} data.status Status of the device
 * @apiSuccess {Number} data.__v Version of the device
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 OK
 * {
 * "message": "Device added successfully",
 * "data": {
 * "name": "RuuviTag",
 * "deviceClass": "Meter",
 * "deviceType": "Multifunctional Sensor",
 * "location": "Alternating",
 * "settings": "Default",
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
 * "status": "Active",
 * "__v": 0
 * }
 * }
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

// Route to add a new device
router.post('/', addDevice);

/**
 * @api {delete} /devices/name/:name Delete device by name
 * @apiName DeleteDeviceByName
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of the device
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Data object
 * @apiSuccess {String} data._id Id of the device
 * @apiSuccess {String} data.name Name of the device
 * @apiSuccess {String} data.deviceClass Class of the device
 * @apiSuccess {String} data.deviceType Type of the device
 * @apiSuccess {String} data.location Location of the device
 * @apiSuccess {String} data.settings Settings of the device
 * @apiSuccess {String} data.status Status of the device
 * @apiSuccess {Number} data.__v Version of the device
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "Device deleted successfully",
 * "data": {
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
 * "name": "RuuviTag",
 * "deviceClass": "Meter",
 * "deviceType": "Multifunctional Sensor",
 * "location": "Alternating",
 * "settings": "Default",
 * "status": "Active",
 * "__v": 0
 * }
 * }
 *
 * @apiError (Error 404) NotFound Device not found
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *
 * "message": "Server error"
 * }
 */

// Route to delete a device by name
router.delete('/name/:name', deleteDeviceByName);

/**
 * @api {put} /devices/name/:name Update device by name
 * @apiName UpdateDeviceByName
 * @apiGroup Devices
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Name of the device
 * @apiParam {String} deviceClass Class of the device
 * @apiParam {String} deviceType Type of the device
 * @apiParam {String} location Location of the device
 * @apiParam {String} settings Settings of the device
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Data object
 * @apiSuccess {String} data._id Id of the device
 * @apiSuccess {String} data.name Name of the device
 * @apiSuccess {String} data.deviceClass Class of the device
 * @apiSuccess {String} data.deviceType Type of the device
 * @apiSuccess {String} data.location Location of the device
 * @apiSuccess {String} data.status Status of the device
 * @apiSuccess {Number} data.__v Version of the device
 * @apiSuccess {String} data.settings Settings of the device
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "Device updated successfully",
 * "data": {
 * "_id": "61a7b8b7b8b7b8b7b8b7b8b7",
 * "name": "RuuviTag",
 * "deviceClass": "Meter",
 * "deviceType": "Multifunctional Sensor",
 * "location": "Alternating",
 * "settings": "Default",
 * "status": "Active",
 * "__v": 0
 * }
 * }
 *
 * @apiError (Error 404) NotFound Device not found
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 * "message": "Device not found"
 * }
 *
 * @apiError (Error 500) InternalServerError Server error
 *
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 * "message": "Server error"
 * }
 *
 */

// Route to update a device by name
router.put('/name/:name', updateDeviceByName);

// Route to notify new device
router.post('/newDevice/:name', newDeviceAlert);

export default router;

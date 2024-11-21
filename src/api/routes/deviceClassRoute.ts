import express from 'express';
import {
  deleteDeviceClass,
  getDeviceClassByName,
  getDeviceClasses,
  postDeviceClass,
  putDeviceClass,
} from '../controllers/deviceClassController';

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} /deviceClass Get device classes
   * @apiName GetDeviceClasses
   * @apiGroup DeviceClass
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Object[]} data Array of device class objects
   * @apiSuccess {String} data.name Name of the device class
   * @apiSuccess {String[]} data.type Array of device types
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *  {
   *   "name": "Meter",
   *   "type": ["Temperature", "Humidity"]
   *  }
   * ]
   *
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .get(getDeviceClasses)
  /**
   * @api {post} /deviceClass Post device
   * @apiName PostDeviceClass
   * @apiGroup DeviceClass
   * @apiVersion 1.0.0
   *
   * @apiBody {String} name Name of the device class
   * @apiBody {String[]} type Array of device types
   * @apiParamExample {json} Request-Example:
   * {
   *  "name": "Meter",
   *  "type": ["Temperature", "Humidity"]
   * }
   *
   * @apiSuccess {String} message Success message
   * @apiSuccess {Object} data Data object
   * @apiSuccess {String} data.name Name of the device class
   * @apiSuccess {String[]} data.type Array of device types
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Device class added",
   *  "data": {
   *           "name": "Meter",
   *           "type": ["Temperature", "Humidity"]
   *          }
   * }
   *
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .post(postDeviceClass);
router
  .route('/:name')
  /**
   * @api {get} /deviceClass/:name Get device class by name
   * @apiName GetDeviceClassByName
   * @apiGroup DeviceClass
   * @apiVersion 1.0.0
   *
   * @apiParam {String} name Name of the device class
   *
   * @apiSuccess {String} name Name of the device class
   * @apiSuccess {String[]} type Array of device types
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "name": "Meter",
   *  "type": ["Temperature", "Humidity"]
   * }
   *
   * @apiError (Error 404) NotFound Device class not found
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *  "message": "Device class not found"
   * }
   *
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .get(getDeviceClassByName)
  /**
   * @api {put} /deviceClass/:name Put device class by name
   * @apiName PutDeviceClass
   * @apiGroup DeviceClass
   *
   * @apiParam {String} name Name of the device class
   *
   * @apiBody {String} name Name of the device class
   * @apiBody {String[]} type Array of device types
   *
   * @apiParamExample {json} Request-Example:
   * {
   *  "name": "Meter",
   *  "type": ["Temperature", "Sound"]
   * }
   *
   * @apiSuccess {String} message Success message
   * @apiSuccess {Object} data Data object
   * @apiSuccess {String} data.name Name of the device class
   * @apiSuccess {String[]} data.type Array of device types
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Device class updated",
   *  "data": {
   *           "name": "Meter",
   *           "type": ["Temperature", "Sound"]
   *          }
   * }
   *
   * @apiError (Error 404) NotFound Device class not found
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *  "message": "Device class not found"
   * }
   *
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   *
   */
  .put(putDeviceClass)
  /**
   * @api {delete} /deviceClass/:name Delete device class by name
   * @apiName DeleteDeviceClass
   * @apiGroup DeviceClass
   *
   * @apiParam {String} name Name of the device class
   *
   * @apiSuccess {String} message Success message
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Device class deleted"
   * }
   *
   * @apiError (Error 404) NotFound Device class not found
   *
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *  "message": "Device class not found"
   * }
   *
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .delete(deleteDeviceClass);

export default router;

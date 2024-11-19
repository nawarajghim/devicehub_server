import express from 'express';
import {getRuuviData, postRuuviData} from '../controllers/ruuviController';

const router = express.Router();

router
  /**
   * @api {get} /ruuviData Get Ruuvi data
   * @apiName GetRuuviData
   * @apiGroup Ruuvi
   * @apiVersion 1.0.0
   *
   * @apiSuccess {Object[]} data Array of Ruuvi data objects
   * @apiSuccess {Number} data.humidity Humidity in percentage
   * @apiSuccess {Number} data.temperature Temperature in Celsius
   * @apiSuccess {Number} data.pressure Pressure in hPa
   * @apiSuccess {String} data.mac MAC address of the RuuviTag
   * @apiSuccess {Date} timestamp Timestamp of the data
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * [
   *  {
   *   "data": {
   *            "humidity": 50,
   *            "temperature": 20,
   *            "pressure": 1000,
   *            "mac": "AA:BB:CC:DD:EE:FF"
   *           },
   *   "timestamp": "2021-01-01T12:00:00.000Z"
   *  }
   * ]
   *
   * @apiError (Error 500) InternalServerError There was an issue getting the Ruuvi data
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .get('/', getRuuviData);
router
  /**
   * @api {post} /ruuviData Post Ruuvi data
   * @apiName PostRuuviData
   * @apiGroup Ruuvi
   * @apiVersion 1.0.0
   * @apiParam {Number} humidity Humidity in percentage
   * @apiParam {Number} temperature Temperature in Celsius
   * @apiParam {Number} pressure Pressure in hPa
   * @apiParam {String} mac MAC address of the RuuviTag
   * @apiParam {Date} timestamp Timestamp of the data
   *
   * @apiSuccess {String} message Ruuvi data saved
   * @apiSuccess {Object} data Ruuvi data object
   * @apiSuccess {Number} data.humidity Humidity in percentage
   * @apiSuccess {Number} data.temperature Temperature in Celsius
   * @apiSuccess {Number} data.pressure Pressure in hPa
   * @apiSuccess {String} data.mac MAC address of the RuuviTag
   * @apiSuccess {Date} data.timestamp Timestamp of the data
   *
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 201 Created
   * {
   *  "message": "Ruuvi data saved",
   *  "data": {
   *           "humidity": 50,
   *           "temperature": 20,
   *           "pressure": 1000,
   *           "mac": "AA
   *          },
   *  "timestamp": "2021-01-01T12:00:00.000Z"
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
  .post('/', postRuuviData);

export default router;

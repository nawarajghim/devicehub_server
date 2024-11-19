import express from 'express';
import {
  getUserRole,
  login,
  postNewPassword,
} from '../controllers/loginController';

const router = express.Router();

router
  /**
   * @api {post} /login Login
   * @apiName Login
   * @apiGroup Login
   * @apiVersion 1.0.0
   * @apiBody {String} username Username
   * @apiBody {String} password Password
   * @apiParamExample {json} Request-Example:
   * {
   *  "username": "admin",
   *  "password": "password"
   * }
   * @apiSuccess {String} message Success message
   * @apiSuccess {Object} data Data object
   * @apiSuccess {String} data.username Username
   * @apiSuccess {String} data.role Role
   * @apiSuccess {String} data.token JWT token
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Login successful",
   *  "data": {
   *           "username": "admin",
   *           "role": "admin",
   *           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjIzNjU0MzIxMjMy"
   *          }
   * }
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .post('/', login);
router
  /**
   * @api {post} /role Get user role
   * @apiName GetUserRole
   * @apiGroup Login
   * @apiVersion 1.0.0
   * @apiHeader {String} Authorization JWT token
   * @apiHeaderExample {json} Header-Example:
   * {
   *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjYxMjIzNjU0MzIxMjMyMzEyMzIzMTIzIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTYxMzUwNzQwMn0.7J9
   * }
   * @apiSuccess {String} message Success message
   * @apiSuccess {Object} data Data object
   * @apiSuccess {String} data.role Role
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Role found",
   *  "data": {
   *           "role": "admin"
   *          }
   * }
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   */
  .post('/role', getUserRole);
router
  /**
   * @api {post} /password Post new password
   * @apiName PostNewPassword
   * @apiGroup Login
   * @apiVersion 1.0.0
   * @apiHeader {String} Authorization JWT token
   * @apiHeaderExample {json} Header-Example:
   * {
   *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpZCI6IjYxMjIzNjU0MzIxMjMyMzEyMzIzMTIzIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTYxMzUwNzQwMn0.7J9
   * }
   * @apiBody {String} password New password
   * @apiParamExample {json} Request-Example:
   * {
   *  "password": "newpassword"
   * }
   * @apiSuccess {String} message Success message
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *  "message": "Password updated"
   * }
   * @apiError (Error 500) InternalServerError Server error
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *  "message": "Server error"
   * }
   *
   */
  .post('/password', postNewPassword);

export default router;

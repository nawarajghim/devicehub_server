import {NextFunction, Request, Response} from 'express';
import {DeviceData} from '../../types/DeviceData';
import deviceDataModel from '../models/deviceDataModel';
import CustomError from '../../classes/CustomError';
import {MessageResponse} from '../../types/MessageTypes';

type DBMessageResponse = MessageResponse & {data: DeviceData | DeviceData[]};

// get all device data
const getDeviceDataList = async (
  req: Request,
  res: Response<DeviceData[]>,
  next: NextFunction
) => {
  try {
    const deviceDataList = await deviceDataModel.find().select('-__v');
    console.log(deviceDataList);
    res.json(deviceDataList);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// get one device's data
const getDeviceData = async (
  req: Request<{deviceId: string}>,
  res: Response<DeviceData>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.deviceId);
    const deviceData = await deviceDataModel.findOne({
      deviceId: id,
    }).select('-__v');
    console.log(id, typeof id);
    if (!deviceData) {
      throw new CustomError('Device data not found', 404);
    }
    res.json(deviceData);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// post device data
const postDeviceData = async (
  req: Request<{}, {}, DeviceData>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const deviceData = new deviceDataModel(req.body);
    const timestamp = new Date();
    deviceData.timestamp = timestamp;
    const newDeviceData = await deviceData.save();
    res.status(201).json({
      message: 'Device data added',
      data: newDeviceData,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// update device data
const putDeviceData = async (
  req: Request<{deviceId: string}, {}, DeviceData>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.deviceId);
    const deviceData = await deviceDataModel.findOne({
      deviceId: id,
    });
    if (!deviceData) {
      throw new CustomError('Device data not found', 404);
    }
    deviceData.data = req.body.data;
    const updatedDeviceData = await deviceData.save();
    res.json({
      message: 'Device data updated',
      data: updatedDeviceData,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// delete device data
const deleteDeviceData = async (
  req: Request<{deviceId: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.deviceId);
    const deviceData = await deviceDataModel.findOne({
      deviceId: id,
    });
    if (!deviceData) {
      throw new CustomError('Device data not found', 404);
    }
    await deviceDataModel.deleteOne({deviceId: id});
    res.json({
      message: 'Device data deleted',
      data: deviceData,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  getDeviceData,
  getDeviceDataList,
  postDeviceData,
  putDeviceData,
  deleteDeviceData,
};

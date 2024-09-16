import {NextFunction, Request, Response} from 'express';
import {DeviceType} from '../../types/DeviceTypeTypes';
import deviceTypeModel from '../models/deviceTypeModel';
import CustomError from '../../classes/CustomError';
// import {MessageResponse} from '../../types/MessageTypes';

// type DBMessageResponse = MessageResponse & {data: DeviceData | DeviceData[]};

// get all device types
const getDeviceTypes = async (
  req: Request,
  res: Response<DeviceType[]>,
  next: NextFunction
) => {
  try {
    const types = await deviceTypeModel.find();
    res.json(types);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// get one device type by name
const getDeviceTypeByName = async (
  req: Request<{name: string}>,
  res: Response<DeviceType>,
  next: NextFunction
) => {
  try {
    // if the first letter is lowercase, capitalize it
    req.params.name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const type = await deviceTypeModel.findOne({
      name: req.params.name,
    });
    console.log(type);
    if (!type) {
      throw new CustomError('Device type not found', 404);
    }
    res.json(type);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {getDeviceTypes, getDeviceTypeByName};

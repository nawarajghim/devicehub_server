import {NextFunction, Request, Response} from 'express';
import {DeviceType} from '../../types/DeviceTypeTypes';
import deviceTypeModel from '../models/deviceTypeModel';
import CustomError from '../../classes/CustomError';
// import {MessageResponse} from '../../types/MessageTypes';

// type DBMessageResponse = MessageResponse & {data: DeviceData | DeviceData[]};

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

export {getDeviceTypes};

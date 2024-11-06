import {NextFunction, Request, Response} from 'express';
import {DeviceClass} from '../../types/DeviceClassTypes';
import deviceClassModel from '../models/deviceClassModel';
import CustomError from '../../classes/CustomError';
import {MessageResponse} from '../../types/MessageTypes';

type DBMessageResponse = MessageResponse & {data: DeviceClass | DeviceClass[]};

// get all device classes
const getDeviceClasses = async (
  req: Request,
  res: Response<DeviceClass[]>,
  next: NextFunction
) => {
  try {
    const classes = await deviceClassModel.find().select('-__v');
    res.json(classes);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// get a device class by name
const getDeviceClassByName = async (
  req: Request<{name: string}>,
  res: Response<DeviceClass>,
  next: NextFunction
) => {
  try {
    // if the first letter is lowercase, capitalize it
    req.params.name =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const type = await deviceClassModel
      .findOne({
        name: req.params.name,
      })
      .select('-__v');
    console.log(type);
    if (!type) {
      throw new CustomError('Device type not found', 404);
    }
    res.json(type);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// get types of devices by device class
const getTypesByClass = async (
  req: Request<{deviceClass: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    // if the first letter is lowercase, capitalize it
    req.params.deviceClass =
      req.params.deviceClass.charAt(0).toUpperCase() +
      req.params.deviceClass.slice(1);
    console.log(req.params.deviceClass);
    const types = await deviceClassModel
    .findOne({
      name: req.params.deviceClass,
    })
    .select('type -_id');
    if (!types) {
      throw new CustomError('Device class not found', 404);
    }
    console.log(types);
    res.json(types.type);
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// post a device class
const postDeviceClass = async (
  req: Request<{}, {}, DeviceClass>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const deviceClass = new deviceClassModel(req.body);
    // name should be only one word, dash-separation is allowed
    if (deviceClass.name.split(' ').length > 1) {
      throw new CustomError(
        'Name should be one word, try dash-separation',
        400
      );
    }
    // if the first letter is lowercase, capitalize it
    deviceClass.name =
      deviceClass.name.charAt(0).toUpperCase() + deviceClass.name.slice(1);
    const newDeviceClass = await deviceClass.save();
    res.status(201).json({
      message: 'Device class added',
      data: newDeviceClass,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// update a device class
const putDeviceClass = async (
  req: Request<{name: string}, {}, DeviceClass>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    // name should be only one word, dash-separation is allowed
    if (req.body.name.split(' ').length > 1) {
      throw new CustomError(
        'Name should be one word, try dash-separation',
        400
      );
    }
    // if the first letter is lowercase, capitalize it
    req.params.name =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const updatedDeviceClass = await deviceClassModel.findOneAndUpdate(
      {name: req.params.name},
      req.body,
      {new: true}
    );
    if (!updatedDeviceClass) {
      throw new CustomError('Device class not found', 404);
    }
    res.json({
      message: 'Device class updated',
      data: updatedDeviceClass,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// delete a device class
const deleteDeviceClass = async (
  req: Request<{name: string}>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    // if the first letter is lowercase, capitalize it
    req.params.name =
      req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
    const deletedDeviceClass = await deviceClassModel.findOneAndDelete({
      name: req.params.name,
    });
    if (!deletedDeviceClass) {
      throw new CustomError('Device class not found', 404);
    }
    res.json({
      message: 'Device class deleted',
      data: deletedDeviceClass,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  getDeviceClasses,
  getDeviceClassByName,
  getTypesByClass,
  postDeviceClass,
  putDeviceClass,
  deleteDeviceClass,
};

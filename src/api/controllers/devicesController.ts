import {NextFunction, Request, Response} from 'express';
import deviceModel from '../models/deviceModel';
import {Device} from '../../types/Device';
import {MessageResponse} from '../../types/MessageTypes';
import CustomError from '../../classes/CustomError';

// Define the response type for the database operations
type DBMessageResponse = MessageResponse & {
  data: Device | Device[];
};

/*********************GET requests**********************/

// Function to get all devices
const getDevices = async (
  req: Request,
  res: Response<Device[]>,
  next: NextFunction
) => {
  try {
    const devices = await deviceModel.find();
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

// Function to get a device by name
const getDeviceByName = async (
  req: Request<{name: string}>,
  res: Response<Device | {message: string}>,
  next: NextFunction
) => {
  try {
    const {name} = req.params;
    // make the name case insensitive
    const device = await deviceModel.findOne({
      name: {$regex: new RegExp(name, 'i')},
    });
    if (!device) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json(device);
  } catch (error) {
    next(error);
  }
};

// Function to get devices by deviceType
const getDevicesByType = async (
  req: Request<{deviceType: string}>,
  res: Response<Device[] | {message: string}>,
  next: NextFunction
) => {
  try {
    const {deviceType} = req.params;
    // make the deviceType case insensitive
    const devices = await deviceModel.find({
      deviceType: {$regex: new RegExp(deviceType, 'i')},
    });
    if (!devices) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

// Function to get devices by location
const getDevicesByLocation = async (
  req: Request<{location: string}>,
  res: Response<Device[] | {message: string}>,
  next: NextFunction
) => {
  try {
    const {location} = req.params;
    // make the location case insensitive
    const devices = await deviceModel.find({
      location: {$regex: new RegExp(location, 'i')},
    });
    if (!devices) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

// Function to get devices by class
const getDevicesByClass = async (
  req: Request<{deviceClass: string}>,
  res: Response<Device[] | {message: string}>,
  next: NextFunction
) => {
  try {
    const {deviceClass} = req.params;
    // make the deviceClass case insensitive
    const devices = await deviceModel.find({
      deviceClass: {$regex: new RegExp(deviceClass, 'i')},
    });
    if (!devices) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json(devices);
  } catch (error) {
    next(error);
  }
};

/*********************POST requests**********************/

// Function to add a new device
const addDevice = async (
  req: Request<{}, {}, Device>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const newDevice = new deviceModel(req.body);
    // new device's status is always 'active'
    newDevice.status = 'active';
    // name can only be one word, dash-separation is allowed
    if (newDevice.name.split(' ').length > 1) {
      throw new CustomError(
        'Name should be one word, try dash-separation',
        400
      );
    }
    const savedDevice = await newDevice.save();

    res.status(201).json({
      message: 'Device added successfully',
      data: savedDevice,
    });
  } catch (error) {
    next(error);
  }
};

/*********************DELETE requests**********************/

// Function to delete a device by name
const deleteDeviceByName = async (
  req: Request<{name: string}>,
  res: Response<DBMessageResponse | {message: string}>,
  next: NextFunction
) => {
  try {
    const {name} = req.params;
    const deleteDevice = await deviceModel.findOneAndDelete({
      name: name,
    });
    if (!deleteDevice) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json({
      message: 'Device deleted successfully',
      data: deleteDevice,
    });
  } catch (error) {
    next(error);
  }
};

/*********************PUT requests**********************/

// Function to update a device by name
const updateDeviceByName = async (
  req: Request<{name: string}, {}, Device>,
  res: Response<DBMessageResponse | {message: string}>,
  next: NextFunction
) => {
  try {
    const {name} = req.params;
    // name can only be one word, dash-separation is allowed
    if (req.body.name.split(' ').length > 1) {
      throw new CustomError(
        'Name should be one word, try dash-separation',
        400
      );
    }
    const updatedDevice = await deviceModel.findOneAndUpdate(
      {
        name: name,
      },
      req.body,
      {new: true}
    );
    if (!updatedDevice) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    res.json({
      message: 'Device updated successfully',
      data: updatedDevice,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getDevices,
  getDeviceByName,
  getDevicesByType,
  getDevicesByLocation,
  getDevicesByClass,
  addDevice,
  deleteDeviceByName,
  updateDeviceByName,
};

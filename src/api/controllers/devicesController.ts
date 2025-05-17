import {NextFunction, Request, Response} from 'express';
import deviceModel from '../models/deviceModel';
import {DetectedDevice, Device} from '../../types/Device';
import {MessageResponse} from '../../types/MessageTypes';
import CustomError from '../../classes/CustomError';
import logger from '../../logger';
import {broadcast} from '../..';
import {newDetectedDevices} from '../../lib/newDetectedDevices';

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

const getDeviceById = async (
  req: Request<{id: string}>,
  res: Response<Device | {message: string}>,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const device = await deviceModel
      .findById(id)
      .orFail(new Error('Device not found'));
    res.json(device);
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
    newDevice.status = 'Active';
    // name can only be one word, dash-separation is allowed
    if (newDevice.name.split(' ').length > 1) {
      throw new CustomError(
        'Name should be one word, try dash-separation',
        400
      );
    }
    // if first letter is lowercase, make it uppercase
    newDevice.name =
      newDevice.name.charAt(0).toUpperCase() + newDevice.name.slice(1);
    const savedDevice = await newDevice.save();

    res.status(201).json({
      message: 'Device added successfully',
      data: savedDevice,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
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
    // make the name case insensitive
    const deleteDevice = await deviceModel.findOneAndDelete({
      name: {$regex: new RegExp(name, 'i')},
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
    // if updating name, make sure it's one word
    // name can only be one word, dash-separation is allowed
    if (req.body.name) {
      if (req.body.name.split(' ').length > 1) {
        throw new CustomError(
          'Name should be one word, try dash-separation',
          400
        );
      }
      // if first letter is lowercase, make it uppercase
      req.body.name =
        req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    }
    const updatedDevice = await deviceModel.findOneAndUpdate(
      {
        name: {$regex: new RegExp(name, 'i')},
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

const updateDeviceById = async (
  req: Request<{id: string}, {}, Device>,
  res: Response<DBMessageResponse | {message: string}>,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    console.log(req.body);
    const updatedDevice = await deviceModel.findOneAndUpdate(
      {_id: id},
      req.body,
      {new: true}
    );
    if (!updatedDevice) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    console.log(updatedDevice);
    res.json({
      message: 'Device updated successfully',
      data: updatedDevice,
    });
  } catch (error) {
    next(error);
  }
};

const updateDataField = async (
  req: Request<
    {id: string},
    {},
    {
      data: {
        humidity?: number;
        temperature?: number;
        pressure?: number;
      };
    }
  >,
  res: Response<DBMessageResponse | {message: string}>,
  next: NextFunction
) => {
  try {
    const {id} = req.params;

    const data = req.body.data;
    const updatedDevice = await deviceModel.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          data: {
            humidity: data.humidity,
            temperature: data.temperature,
            pressure: data.pressure,
          },
          last_updated: new Date().toISOString(),
        },
      },
      {new: true}
    );
    if (!updatedDevice) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    console.log(updatedDevice);
    res.json({
      message: 'Device data updated successfully',
      data: updatedDevice,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles the alert for a new device by checking if the device exists
 * in the database. If the device does not exist, logs the event and
 * broadcasts a new device alert, adding it to the detected devices list.
 *
 * @param req - The request object containing the device name as a parameter.
 * @param res - The response object to return the device data if found.
 * @param next - The next middleware function in the chain for error handling.
 */

const newDeviceAlert = async (
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
      logger.info(`New device found with name: ${name}`);
      const detectedDevice = {
        event_type: 'new_device_alert_stream',
        data: {device_name: name},
        last_updated: new Date(),
      };
      if (!newDetectedDevices.some((d) => d.data.device_name === name)) {
        newDetectedDevices.push(detectedDevice);
      }
      broadcast(detectedDevice);
      return res.status(201).json({
        message: 'New device alert broadcasted',
      });
    }
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({message: 'Device not found'});
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Returns a list of all detected devices that are not stored in the database
 * yet. The list is filtered against the database devices to only include
 * devices that have not been stored yet.
 *
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function in the middleware chain
 */
const getDetectedDevices = async (
  req: Request,
  res: Response<DetectedDevice[] | {message: string}>,
  next: NextFunction
) => {
  try {
    const devices = await deviceModel.find();
    const detectedDevices = newDetectedDevices.filter(
      (device) => !devices.some((d) => d.name === device.data.device_name)
    );

    res.json(detectedDevices);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export {
  getDevices,
  getDeviceByName,
  getDevicesByType,
  getDevicesByLocation,
  getDevicesByClass,
  getDeviceById,
  addDevice,
  deleteDeviceByName,
  updateDeviceByName,
  updateDeviceById,
  updateDataField,
  newDeviceAlert,
  getDetectedDevices,
};

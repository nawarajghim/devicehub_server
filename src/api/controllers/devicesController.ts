import { NextFunction, Request, Response } from "express";
import deviceModel from "../models/deviceModel";
import { Device } from "../../types/Device";
import { MessageResponse } from "../../types/MessageTypes";

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
}


// Function to get a device by name
const getDeviceByName = async (
    req: Request<{name: string}>,
    res: Response<Device | { message: string }>,
    next: NextFunction
) => {
    try {
        
        const {name} = req.params;
        const device = await deviceModel.findOne({
            name:
            name
        })
        if (!device) {
            res.status(404).json({
                message: 'Device not found'
            });
            return;
        }
        res.json(device);
    }   catch (error) {
        next(error);
    }
}


// Function to get devices by type
const getDevicesByType = async (
    req: Request<{type: string}>,
    res: Response<Device[] | {message: string}>,
    next: NextFunction
) => {
    try {
        const {type} = req.params;
        const devices = await deviceModel.find({
            type: type
        })
        if (!devices) {
            res.status(404).json({
                message: 'Device not found'
            });
            return;
        }
        res.json(devices);
    } catch (error) {
        next(error);
    }
    
}

// Function to get devices by location
const getDevicesByLocation = async(
    req: Request<{location: string}>,
    res: Response<Device[] | {message: string}>,
    next: NextFunction
) => {
    try {
        const {location} = req.params;
        const devices = await deviceModel.find({
            location: location
        })
        if (!devices) {
            res.status(404).json({
                message: 'Device not found'
            });
            return;
        }
        res.json(devices);
    }   catch (error) {
        next(error);
    }
}

/*********************POST requests**********************/

// Function to add a new device
const addDevice = async (
    req: Request<{}, {}, Device>,
    res: Response<DBMessageResponse>,
    next: NextFunction
) => {
    try {
        const newDevice = new deviceModel(req.body);
        const savedDevice = await newDevice.save();

        res.status(201).json({
            message: 'Device added successfully',
            data: savedDevice
        })
    } catch (error) {
        next(error);
    }
}

export { getDevices, getDeviceByName, getDevicesByType, getDevicesByLocation, addDevice };
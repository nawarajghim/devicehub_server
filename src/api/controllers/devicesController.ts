import { NextFunction, Request, Response } from "express";
import deviceModel from "../models/deviceModel";
import { Device } from "../../types/Device";


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
    }   catch (error) {
        next(error);
    }
}


export { getDevices, getDeviceByName };
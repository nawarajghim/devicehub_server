import {NextFunction, Request, Response} from 'express';
import ruuviModel from '../models/deviceDataDetailsModel';
import {Ruuvi} from '../../types/Ruuvi';
import {MessageResponse} from '../../types/MessageTypes';
import CustomError from '../../classes/CustomError';
import deviceModel from '../models/deviceModel';

type DBMessageResponse = MessageResponse & {
  data: Ruuvi;
};

const getRuuviData = async (
  req: Request,
  res: Response<Ruuvi[]>,
  next: NextFunction
) => {
  try {
    const ruuviData = await ruuviModel.find();
    res.json(ruuviData);
  } catch (err) {
    next(new CustomError((err as Error).message, 500));
  }
};

const getRuuviDataById = async (
  req: Request,
  res: Response<Ruuvi[]>,
  next: NextFunction
) => {
  const {deviceId} = req.params;
  console.log('MR mR', deviceId);
  try {
    const ruuviData = await ruuviModel.find({device: deviceId}).exec();
    if (!ruuviData) {
      return res.json([]);
    }
    res.json(ruuviData);
  } catch (err) {
    next(new CustomError((err as Error).message, 500));
  }
};

const postRuuviData = async (
  req: Request<{}, {}, Ruuvi>,
  res: Response<DBMessageResponse | {message: string}>,
  next: NextFunction
) => {
  try {
    console.log('request', req.body);
    const device = await deviceModel.findOne({
      name: {$regex: new RegExp(req.body.data.name, 'i')},
    });
    console.log({device});
    if (!device) {
      res.status(404).json({
        message: 'Device not found',
      });
      return;
    }
    const deviceId = device._id;
    const ruuvi = new ruuviModel({...req.body, device: deviceId});
    const savedRuuvi = await ruuvi.save();

    res.status(201).json({
      message: 'Ruuvi data saved',
      data: savedRuuvi,
    });
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

export {postRuuviData, getRuuviData, getRuuviDataById};

import {NextFunction, Request, Response} from 'express';
import ruuviModel from '../models/ruuviModel';
import {Ruuvi} from '../../types/Ruuvi';
import {MessageResponse} from '../../types/MessageTypes';
import CustomError from '../../classes/CustomError';

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

const postRuuviData = async (
  req: Request<{}, {}, Ruuvi>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const ruuvi = new ruuviModel(req.body);
    const savedRuuvi = await ruuvi.save();

    res.status(201).json({
      message: 'Ruuvi data saved',
      data: savedRuuvi,
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {postRuuviData, getRuuviData};

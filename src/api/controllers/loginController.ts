import {NextFunction, Request, Response} from 'express';
import adminModel from '../models/adminModel';
import {Admin} from '../../types/Admin';
import {MessageResponse, RoleResponse} from '../../types/MessageTypes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CustomError from '../../classes/CustomError';

type DBMessageResponse = MessageResponse & {
  data: {username: string; role: string; token: string};
};

const JWT_SECRET = process.env.JWT_SECRET;

// get admin
const getAdmin = async (
  req: Request,
  res: Response<Admin[]>,
  next: NextFunction
) => {
  try {
    const adminList = await adminModel.find().select('-__v');
    res.json(adminList);
  } catch (error) {
    next(error);
  }
};

// get user role by token
const getUserRole = async (
  req: Request<{}, {}, Admin>,
  res: Response<RoleResponse>,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return next(new Error('No token, authorization denied'));
    }
    const decoded = jwt.verify(token, JWT_SECRET as string);
    // if the token is valid, return the role
    res.json({
      message: 'Role found',
      data: {
        role: (decoded as {role: string}).role,
      },
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

// login
const login = async (
  req: Request<{}, {}, Admin>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body;

    // find the admin
    const admins = await adminModel.find();

    console.log('admin-login', admins);
    const admin = admins.find((admin) => admin.username === username);
    if (!admin) {
      return next(new Error('Invalid username or password'));
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return next(new Error('Invalid username or password'));
    }

    // creating token
    const token = jwt.sign(
      {id: admin.id, username: admin.username, role: admin.role},
      JWT_SECRET as string
    );

    res.json({
      message: 'Login successful',
      data: {
        username: admin.username,
        role: admin.role,
        token,
      },
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const postNewPassword = async (
  req: Request<{}, {}, Admin>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const {password} = req.body;

    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return next(new Error('No token, authorization denied'));
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);
    const admin = await adminModel.findById((decoded as {id: string}).id);

    if (!admin) {
      return next(new Error('Admin not found'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({
      message: 'Password updated',
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export {login, getAdmin, getUserRole, postNewPassword};

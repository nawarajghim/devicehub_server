import {NextFunction, Request, Response} from 'express';
import adminModel from '../models/adminModel';
import {Admin} from '../../types/Admin';
import {MessageResponse} from '../../types/MessageTypes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// login
const login = async (
  req: Request<{}, {}, Admin>,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body;

    // Find admin by username and retrieve password, role, and username fields
    const admin = await adminModel
      .findOne({username})
      .select('password role username');

    // If no matching admin found, throw error
    if (!admin) {
      return next(new Error('Invalid username or password'));
    }

    // Compare the entered password with the hashed password from the database
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return next(new Error('Invalid username or password'));
    }

    // Create a JWT token with the admin's username and role
    const token = jwt.sign(
      {id: admin.id, username: admin.username, role: admin.role},
      JWT_SECRET as string
    );

    // Respond with success message and admin data (excluding the password)
    res.json({
      message: 'Login successful',
      data: {
        username: admin.username,
        role: admin.role,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export {login, getAdmin};

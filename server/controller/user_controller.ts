import { Request, Response } from 'express';
import * as IceUserService from '../services/user_service';
import * as Utils from '../utils/utils';
import { HttpResponse } from '@angular/common/http';
import {
  BaseError,
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItemType,
} from 'sequelize';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await IceUserService.getAllUsers();
  res.json(users).status(200);
};

export const getIceUser = async (req: Request, res: Response) => {
  const userId = req.params['userId'];
  const user = await IceUserService.getIceUser(Number(userId));

  if (user) {
    res.json(user).status(200);
  } else {
    res.status(404).json('Not found');
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {
  const email = req.params['email'];
  console.log('email', email);
  const password = req.params['password'];
  console.log('pass', password);
  try {
    const user = await IceUserService.getLoggedInUser(email, password);
    const token = Utils.generateToken(25);
    if (user) {
      const newUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        imageUrl: user.imageUrl,
        token: token,
      };
      res.status(201).json({ user: newUser });
    } else {
      throw new Error('User does not exist');
    }
  } catch (error) {
    // error instanceof ValidationError
    //   ? console.log(error.errors)
    //   : (error as Error).message;
    // console.log(ValidationErrorItemType);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const saveIceUser = async (req: Request, res: Response) => {
  const userToBeSaved = req.body;
  try {
    const user = await IceUserService.saveIceUser(userToBeSaved);
    const token = Utils.generateToken(25);
    const newUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      imageUrl: user.imageUrl,
      token: token,
    };
    res.status(201).json({ user: newUser });
  } catch (error) {
    error instanceof ValidationError
      ? console.log(error.errors)
      : (error as Error).message;
    // console.log(ValidationErrorItemType);
    res.status(400).json({ message: (error as Error).message });
  }
};

export const updateIceUser = async (req: Request, res: Response) => {
  const userUpdateData = req.body;
  const userId = Number.parseInt(req.params['userId']);
  try {
    const user = await IceUserService.updateIceUser(userId, userUpdateData);
    res.status(204).json(user);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteIceUser = async (req: Request, res: Response) => {
  const userId = Number.parseInt(req.params['userId']);

  if (Number.isNaN(userId) || !userId) {
    res.status(400).json({ message: 'Invalid User Id' });
  } else {
    try {
      const result = await IceUserService.deleteIceUser(userId);
      res.status(204).json(result);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
};

import { Request, Response } from 'express';
import * as IceUserService from '../services/user_service';

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

export const saveIceUser = async (req: Request, res: Response) => {
  const userToBeSaved = req.body;
  try {
    const user = await IceUserService.saveIceUser(userToBeSaved);
    res.status(201).json(user);
  } catch (error) {
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

import express from 'express';
import * as userController from '../controller/user_controller';

export const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getIceUser);
router.post('/users', userController.saveIceUser);
router.get('/users/:email/:password', userController.getLoggedInUser);
router.put('/users/:userId', userController.updateIceUser);
router.delete('/users/:userId', userController.deleteIceUser);

import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

//  1. POST - user sign up
router.post('/signup', userController.createUser);

//  1. POST - user log in
router.post('/login', userController.loginUser);

export default router;

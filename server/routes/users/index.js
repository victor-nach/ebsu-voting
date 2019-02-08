import express from 'express';
import UserController from '../../controllers/userController';
import userValidation from '../../middlewares/validation/userValidation';
import validationResult from '../../middlewares/validation/validationResult';

const router = express.Router();

const { checkAddUser } = userValidation;

//  1. POST - user sign up
router.post('/signup', checkAddUser, validationResult, UserController.registerUser);

//  1. POST - user log in
router.post('/login', UserController.loginUser);

export default router;

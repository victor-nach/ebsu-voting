//  Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';

import officeValidation from '../../middlewares/validation/officeValidation';
import validationResult from '../../middlewares/validation/validationResult';

const router = express.Router();

const { checkOfficeId, checkAddOffice } = officeValidation;

//  1. POST - create a political office
router.post('/', checkAddOffice, officeController.createOffice);

//  2. GET - get all political ofices
router.get('/', officeController.getAllOffices);

//  3. GET - get a political ofices
router.get('/:id', checkOfficeId, validationResult, officeController.getSingleOffice);


export default router;

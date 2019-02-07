//  Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';

import officeValidation from '../../middlewares/validation/officeValidation';
import validationResult from '../../middlewares/validation/validationResult';

const router = express.Router();

const { checkOfficeId, checkAddOffice } = officeValidation;

//  1. POST - create a political office
router.post('/', checkAddOffice, officeController.createOffice);

//  2. POST - create a political office
router.post('/:id/register', officeController.registerCandidateForOffice);

//  3. GET - get all political ofices
router.get('/', officeController.getAllOffices);

//  4. GET - get a political ofice
router.get('/:id', checkOfficeId, validationResult, officeController.getSingleOffice);

//  3. POST - get all reult for political office
router.post('/:id/result', officeController.getResult);

export default router;

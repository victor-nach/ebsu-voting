//  Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';

import officeValidation from '../../middleware/validation/officeValidation';
import validationResult from '../../middleware/validation/validationResult';

const router = express.Router();

const { checkOfficeId, checkAddOffice, checkEditOffice } = officeValidation;

//  1. POST - create a political office
router.post('/', checkAddOffice, validationResult, officeController.createOffice);

//  2. GET - get all political ofices
router.get('/', officeController.getAllOffices);

//  3. GET - get a political ofices
router.get('/:id', checkOfficeId, validationResult, officeController.getSingleOffice);

//  4. PATCH- update a political office
router.patch('/:id/:name', checkOfficeId, checkEditOffice, validationResult, officeController.updateOffice);

//  5. DELETE- delete a political office
router.delete('/:id', checkOfficeId, validationResult, officeController.deleteOffice);

export default router;

//  Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';

const router = express.Router();

//  1. POST - create a political office
router.post('/', officeController.createOffice);

//  2. GET - get all political ofices
router.get('/', officeController.getAllOffices);

//  3. GET - get a political ofices
router.get('/:id', officeController.getSingleOffice);

//  4. PATCH- update a political office
router.patch('/:id/:name', officeController.updateOffice);

//  5. DELETE- delete a political office
router.delete('/:id', officeController.deleteOffice);

export default router;

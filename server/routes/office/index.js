//  Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';
import Authenticate from '../../middlewares/authenticate';
import officeValidation from '../../middlewares/validation/officeValidation';
import validationResult from '../../middlewares/validation/validationResult';
import OfficeVerification from '../../middlewares/officeVerification';

const router = express.Router();

const { checkOfficeId, checkAddOffice } = officeValidation;
const {
  createOffice,
  registerCandidateForOffice,
  getAllOffices,
  getResult,
  getSingleOffice,
} = officeController;

const { checkIdExists, checkNameExists } = OfficeVerification;

const { verifyUser, verifyAdmin } = Authenticate;

//  1. POST - create a political office
router.post('/', checkAddOffice, validationResult, checkNameExists, createOffice);

//  2. POST - register a candidate for a political office
router.post('/:id/register', verifyUser, verifyAdmin, registerCandidateForOffice);

//  2. GET - get all political ofices
router.get('/', getAllOffices);

//  3. GET - get a political ofice
router.get('/:id', checkOfficeId, validationResult, checkIdExists, getSingleOffice);

//  4. POST - get all results for political office
router.post('/:id/result', checkOfficeId, checkIdExists, getResult);

export default router;

//  Handles all Party Routes

import express from 'express';
import partyController from '../../controllers/partyController';
import partyValidation from '../../middlewares/validation/partyValidation';
import validationResult from '../../middlewares/validation/validationResult';
import Partyverification from '../../middlewares/partyVerification';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();


const { checkPartyId, checkAddParty, checkEditParty } = partyValidation;

const { checkIdExists, checkNameExists, checkParamName } = Partyverification;

const {
  createParty,
  getAllparties,
  getSingleParty,
  deleteParty,
  updateParty,
} = partyController;

const { verifyAdmin, verifyUser } = authenticate;

//  1. POST - create a political party
router.post('/', verifyAdmin, checkAddParty, validationResult, checkNameExists, createParty);

//  2. GET - get all political parties
router.get('/', getAllparties);

//  3. GET - get a political parties
router.get('/:id', verifyUser, checkPartyId, validationResult, checkIdExists, getSingleParty);

//  4. PATCH- update a political party
router.patch('/:id/:name', verifyAdmin, checkPartyId, checkEditParty, validationResult, checkIdExists, checkParamName, updateParty);

//  5. DELETE- delete a political party
router.delete('/:id', verifyAdmin, checkPartyId, checkIdExists, deleteParty);


export default router;

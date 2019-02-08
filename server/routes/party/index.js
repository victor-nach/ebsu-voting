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

const { checkAdmin, checkUser } = authenticate;

//  1. POST - create a political party
router.post('/', checkAddParty, validationResult, checkNameExists, createParty);

//  2. GET - get all political parties
router.get('/', getAllparties);

//  3. GET - get a political parties
router.get('/:id', checkPartyId, validationResult, checkIdExists, getSingleParty);

//  4. PATCH- update a political party
router.patch('/:id/:name', checkPartyId, checkEditParty, validationResult, checkIdExists, checkParamName, updateParty);

//  5. DELETE- delete a political party
router.delete('/:id', checkPartyId, checkIdExists, deleteParty);


export default router;

//  Handles all Party Routes

import express from 'express';
import partyController from '../../controllers/partyController';
import partyValidation from '../../middleware/validation/partyValidation';
import validationResult from '../../middleware/validation/validationResult';

const router = express.Router();

const { checkPartyId, checkAddParty, checkEditParty } = partyValidation;

//  1. POST - create a political party
router.post('/', checkAddParty, validationResult, partyController.createParty);

//  2. GET - get all political parties
router.get('/', partyController.getAllparties);

//  3. GET - get a political parties
// router.get('/:id', checkAddParty, partyController.getSingleParty);
router.get('/:id', checkPartyId, validationResult, partyController.getSingleParty);

//  4. PATCH- update a political party
router.patch('/:id/:name', checkPartyId, checkEditParty, validationResult, partyController.updateParty);

//  5. DELETE- delete a political party
router.delete('/:id', checkPartyId, partyController.deleteParty);


export default router;

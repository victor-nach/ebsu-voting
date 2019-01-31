//  Handles all Party Routes

import express from 'express';
import partyController from '../../controllers/partyController';

const router = express.Router();

//  1. POST - create a political party
router.post('/', partyController.createParty);

//  2. GET - get all political parties
router.get('/', partyController.getAllparties);

//  3. GET - get a political parties
router.get('/:id', partyController.getSingleParty);

//  4. PATCH- update a political party
router.patch('/:id/:name', partyController.updateParty);

//  5. DELETE- delete a political party
router.delete('/:id', partyController.deleteParty);


export default router;

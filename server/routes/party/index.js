//Handles all Party Routes

import express from 'express';
import partyController from '../../controllers/partyController';

const router = express.Router();

//1. POST - create a political party
router.post('/', (req, res) => {
    res.status(200).json({ message: 'you have created a party'});
});

//2. GET - get all political parties
router.get('/', (req, res) => {
    res.status(200).json({ message: 'you have retrieved all parties'});
});

//3. GET - get a political parties
router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'you have retrieved all parties'});
});

//4. PATCH- update a political party
router.patch('/:id/name', (req, res) => {
    res.status(200).json({ message: 'you have updated a party'});
});

//5. DELETE- delete a political party
router.delete('/:id', (req, res) => {
    res.status(200).json({ message: 'you have deleted a party'});
});



export default router;
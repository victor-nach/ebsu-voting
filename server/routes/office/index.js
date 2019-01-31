//Handles all Office Routes

import express from 'express';
import officeController from '../../controllers/officeController';

const router = express.Router();

//1. POST - create a political office
router.post('/', (req, res) => {
  res.status(200).json({ message: 'you have created a office'});
});

//2. GET - get all political ofices
router.get('/', (req, res) => {
  res.status(200).json({ message: 'you have retrieved all ofices'});
});

//3. GET - get a political ofices
router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'you have retrieved all ofices'});
});

//4. PATCH- update a political office
router.patch('/:id/name', (req, res) => {
  res.status(200).json({ message: 'you have updated a office'});
});

//5. DELETE- delete a political office
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'you have deleted a office'});
});

export default router;
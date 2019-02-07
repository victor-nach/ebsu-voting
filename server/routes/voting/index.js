import express from 'express';
import votingController from '../../controllers/votingController';

const router = express.Router();

//  1. POST - user vote
router.post('/', votingController.vote);

export default router;

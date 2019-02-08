import express from 'express';
import votingController from '../../controllers/votingController';
import authenticate from '../../middlewares/authenticate';
import voteVerification from '../../middlewares/voteVerification';

const router = express.Router();

const {
  checkOfficeId, checkUserId, checkCandidateId, checkVotes,
} = voteVerification;

//  1. POST - user vote
router.post('/',
  authenticate.verifyUser,
  checkUserId,
  checkCandidateId,
  checkOfficeId,
  checkVotes,
  votingController.vote);

export default router;

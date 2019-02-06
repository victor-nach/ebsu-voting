import express from 'express';
import partyRoutes from './party';
import officeRoutes from './office';
import userRoutes from './users';

const router = express.Router();

//  for all party routes
router.use('/parties', partyRoutes);

//  for all office routes
router.use('/offices', officeRoutes);

//  for all user routes
router.use('/user', userRoutes);

//  handle all requests on api/v1 endpoint as specified in app.js
router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to politico api version 1.0' });
});

export default router;

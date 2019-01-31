import express from 'express';
// eslint-disable-next-line no-unused-vars
import partyRoutes from './party';
// eslint-disable-next-line no-unused-vars
import officeRoutes from './office';

const router = express.Router();

//  for all party routes
router.use('/parties', partyRoutes);

//  for all office routes
router.use('/office', officeRoutes);

//  handle all requests on api/v1 endpoint as specified in app.js
router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to politico api version 1.0' });
});

export default router;

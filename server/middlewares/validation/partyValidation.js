import { check } from 'express-validator/check';

//  object to contain all validations array
const partyValidation = {

  // specifically check for party ID
  checkPartyId: [
    check('id').isInt().withMessage('kindly put in a valid id, id should be an integer'),
  ],

  // check all inputs during creation of party
  checkAddParty: [
    check('name').trim().isLength({ min: 1 }).withMessage('kindly put in party name'),
    check('name').trim().matches(/^[a-zA-Z ]+$/).withMessage('party name should only contain alphabets'),
    check('hqAddress').trim().isLength({ min: 1 }).withMessage('kindly put in party name'),
    check('name').trim().matches(/^[a-zA-Z ]+$/).withMessage('hqAddress name should only contain alphabets'),
    check('logoUrl').trim().isURL({ min: 1 }).withMessage('kindly put in a valid logo Url name'),
  ],

  // check all inputs during updating of party name
  checkEditParty: [
    check('name').trim().isLength({ min: 1 }).withMessage('kindly put in party name'),
    check('name').trim().matches(/^[a-zA-Z ]+$/).withMessage('party name should only contain alphabets'),
  ],

};

export default partyValidation;

import { check } from 'express-validator/check';

//  object to contain all validations array
const partyValidation = {

  // specifically check for party ID
  checkPartyId: [
    check('id').isInt().withMessage('kindly put in an integer as the id'),
    check('id').isFloat({ min: 1, max: 5 }),
  ],

  // check all inputs during creation of party
  checkAddParty: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the party name'),
    check('hqAddress').isLength({ min: 1 }).withMessage('kindly put in the hq Address name'),
    check('logoUrl').isURL({ min: 1 }).withMessage('kindly put in a valid logo Url name'),
  ],

  // check all inputs during updating of party name
  checkEditParty: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the party name'),
    // check('name').equals('state').withMessage('An office with this name already exists'),
  ],

};

export default partyValidation;

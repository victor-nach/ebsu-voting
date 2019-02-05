import { check } from 'express-validator/check';
import officeDb from '../../models/offices';

// get the length of currently available items in the offices array
const totoalOffices = officeDb.length;

//  object to contain all validations array
const officeValidation = {

  // specifically check for office ID
  checkOfficeId: [
    check('id').isInt().withMessage('kindly put in an integer as the id'),
    check('id').isFloat({ min: 1, max: totoalOffices }),
  ],

  // check all inputs during creation of office
  checkAddOffice: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the office name'),
    check('type').isLength({ min: 1 }).withMessage('kindly put in the office type'),
  ],

  // check all inputs during updating of office name
  checkEditOffice: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the office name'),
    check('name').equals('All Progressive Congress').withMessage('A party with this name already exists'),
  ],

};

export default officeValidation;

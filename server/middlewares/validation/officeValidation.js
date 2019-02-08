import { check } from 'express-validator/check';

//  object to contain all validations array
const officeValidation = {

  // specifically check for office ID
  checkOfficeId: [
    check('id').isInt().withMessage('kindly put in a valid id, id should be an integer'),
  ],

  // check all inputs during creation of party
  checkAddOffice: [
    check('name').trim().isLength({ min: 1 }).withMessage('kindly put in office name, field should not be empty'),
    check('name').trim().matches(/^[a-zA-Z ]+$/).withMessage('office name should only contain alphabets'),
    check('type').trim().matches(/^[a-zA-Z ]+$/).withMessage('office type should only contain alphabets'),
    check('type').trim().isLength({ min: 1 }).withMessage('kindly put in office type, field should not be empty'),
  ],

  // check all inputs during updating of office name
  checkEditOffice: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the office name'),
  ],

};

export default officeValidation;

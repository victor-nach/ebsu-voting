import { check } from 'express-validator/check';


//  object to contain all validations array
const userValidation = {

  // check all inputs during creation of user
  checkAddUser: [
    check('firstName').isLength({ min: 1 }).withMessage('kindly put in the user first name'),
    check('firstName').trim().matches(/^[a-zA-Z ]+$/).withMessage('first name field should only contain alphabets'),
    check('lastName').isLength({ min: 1 }).withMessage('kindly put in the user last name'),
    check('lastName').trim().matches(/^[a-zA-Z ]+$/).withMessage('last name field should only contain alphabets'),
    check('email').isEmail({ min: 1 }).withMessage('kindly put in a valid email address'),
    check('phoneNumber').isLength({ min: 1 }).withMessage('kindly put in the phoneNumber'),
    check('phoneNumber').isLength({ min: 11 }).withMessage('kindly put in valid phoneNumber, not up to 11 numbers'),
    check('phoneNumber').isLength({ max: 11 }).withMessage('kindly put in valid phoneNumber, maximum number exceeded'),
    check('passportUrl').isURL({ min: 1 }).withMessage('kindly put in a valid pasport Url'),
    check('password').isLength({ min: 1 }).withMessage('kindly put in your password'),
    // check('isAdmin').optional().isBoolean().withMessage('isAdmin value should be true or false'),
  ],

  // check all inputs during updating of user name
  checkEditUser: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the user name'),
    check('name').equals('state').withMessage('An office with this name already exists'),
  ],

};

export default userValidation;

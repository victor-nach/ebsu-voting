import { check } from 'express-validator/check';
import userDb from '../../models/parties';


//  object to contain all validations array
const userValidation = {

  // check all inputs during creation of user
  checkAddUser: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the user name'),
    check('hqAddress').isLength({ min: 1 }).withMessage('kindly put in the hq Address name'),
    check('logoUrl').isURL({ min: 1 }).withMessage('kindly put in a valid logo Url name'),
    check('website').isLength({ min: 1 }).withMessage('kindly put in the user\'s web sddress'),
    check('slogan').isLength({ min: 1 }).withMessage('kindly put in the hq Address name'),
  ],

  // check all inputs during updating of user name
  checkEditUser: [
    check('name').isLength({ min: 1 }).withMessage('kindly put in the user name'),
    check('name').equals('state').withMessage('An office with this name already exists'),
  ],

};

export default userValidation;

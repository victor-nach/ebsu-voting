import jwt from 'jsonwebtoken';
import db from '../models/index';
import helper from '../utils/helper';

class UserController {
  /**
      * 1. CREATE - create a new office object
      * @method createOffice
      * @parameters {object} req
      * @parameters {object} res
      * @return {object} The new office that was just created
    */

  static async createUser(req, res) {
    // user is expected to send the name and type in the req.body, so we destructure it
    const {
      firstName, lastName, email, phoneNumber, passportUrl, password,
    } = req.body;

    const hashedPassword = helper.hashPassword(password);

    // sql to insert a row to our already created database
    const queryText = `INSERT INTO
      users (firstName, lastName, email, phoneNumber, passportUrl, hashedPassword)
      values($1, $2, $3, $4, $5, $6)
      returning id, firstName, lastName, email, phoneNumber, passportUrl`;

    const values = [
      firstName,
      lastName,
      email,
      phoneNumber,
      passportUrl,
      hashedPassword,
    ];

    try {
      const { rows } = await db.query(queryText, values);
      const token = helper.generateToken(rows[0].id);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  //   create user end

  // end of class
}

export default UserController;

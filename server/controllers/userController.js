import db from '../models';
import helper from '../utils/helper';

class UserController {
  /**
      * 1.@method createUser
      * @description registers a new user
      * @parameters {object} req
      * @parameters {object} res
      * @return {object} JSON API response
    */

  static async registerUser(req, res) {
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

  /**
      * 1.@method loginUser
      * @description Logs in a user if all details are correct
      * @parameters {object} req - Thr request object
      * @parameters {object} res - The response object
      * @return {object} JSON API response
    */
  static async loginUser(req, res) {
    // user is expected to send the name and type in the req.body, so we destructure it
    const { email } = req.body;

    // find the requested user from the remote database
    const queryText = 'SELECT firstName, lastName, email, phoneNumber, passportUrl FROM users WHERE email = $1';

    const values = [email];

    try {
      const { rows } = await db.query(queryText, values);

      const token = helper.generateToken(rows[0].id);
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }


  // end of class
}

export default UserController;

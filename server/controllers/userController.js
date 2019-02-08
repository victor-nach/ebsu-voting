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
      firstName, lastName, email, phoneNumber, passportUrl, password, isAdmin,
    } = req.body;

    const hashedPassword = helper.hashPassword(password);

    // sql to insert a row to our already created database
    const queryText = `INSERT INTO
      users (firstName, lastName, email, phoneNumber, passportUrl, hashedPassword, isAdmin)
      values($1, $2, $3, $4, $5, $6, $7)
      returning id, firstName, lastName, email, phoneNumber, passportUrl`;

    const values = [
      firstName,
      lastName,
      email,
      phoneNumber,
      passportUrl,
      hashedPassword,
      isAdmin || false,
    ];

    try {
      const { rows } = await db.query(queryText, values);
      const token = helper.genrateToken(rows[0].id, rows[0].isadmin);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'user already exists',
        });
      }
      return res.status(500).send('sorry your request cannot be completed at this time');
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
    const { email, password } = req.body;

    // find the requested user from the database
    const queryText = 'SELECT * FROM users WHERE email = $1';

    const values = [email];

    try {
      const { rows } = await db.query(queryText, values);
      if (!rows[0]) {
        return res.status(400).json({ message: 'The email address is incorrect' });
      }
      if (!helper.comparePassword(rows[0].hashedpassword, password)) {
        return res.status(400).json({ message: 'The password is incorrect, doesn\'t match' });
      }
      const token = helper.genrateToken(rows[0].id, rows[0].isadmin);
      delete rows[0].isadmin;
      delete rows[0].hashedpassword;
      return res.status(200).json({
        status: 200,
        data: {
          token,
          user: rows[0],
        },
      });
    } catch (error) {
      return res.status(500).send('sorry your request cannot be completed at this time');
    }
  }


  // end of class
}

export default UserController;

import db from '../models/index';

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
      firstName, lastName, email, phoneNumber, passportUrl, isAdmin,
    } = req.body;

    // sql to insert a row to our already created database
    const text = `INSERT INTO
      users (firstName, lastName, email, phoneNumber, passportUrl, isAdmin)
      values($1, $2, $3, $4, $5, $6)
      returning *`;

    const values = [
      firstName,
      lastName,
      email,
      phoneNumber,
      passportUrl,
      isAdmin,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  //   create user end

  // end of class
}

export default UserController;

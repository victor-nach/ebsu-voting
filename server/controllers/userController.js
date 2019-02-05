import uuidv4 from 'uuid/v4';
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
    const { firstName, lastName } = req.body;

    // sql to insert a row to our already created database
    const queryText = `INSERT INTO
      users(id, firstName, lastName)
      values($1, $2, $3)
      returning *`;

    const values = [
      uuidv4(),
      firstName,
      lastName,
    ];

    try {
      const { rows } = await db.query(queryText, values);
      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  //   create user end

  // end of class
}

export default UserController;

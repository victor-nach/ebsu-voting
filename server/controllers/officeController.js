import db from '../models/index';
import officeDb from '../models/offices';

class officeController {
  /**
    * 1. CREATE - create a new office object
    * @method createOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was just created
  */

  static async createOffice(req, res) {
  // user is expected to send the name and hqAddress, logoUrl in the req.body
    const {
      name, type,
    } = req.body;

    // sql to insert a row to our already created database
    const text = `INSERT INTO
      office (name, type)
      values($1, $2)
      returning *`;

    const values = [
      name,
      type,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  // create Party end


  /**
    * 2. RETRIEVE - get a single office object
    * @method getSingleOffice
    * @parameters {object} req
    * @parameters {object} res
    * @return {object} The new office that was requested for
  */

  static async getSingleOffice(req, res) {
    // the id to be used is sent as a url parameter
    const { id } = req.params;

    // find the requested office from database
    const text = 'SELECT * FROM user WHERE id = $1';

    const values = [
      id,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  // get single office end


  /**
    * 3. RETRIEVE - get all offices as an array
    * @method getAllOffices
    * @parameters {object} req
    * @parameters {object} res
    * @return [array] An array Containing all the offices available
  */

  static async getAllOffices(req, res) {
    // In this case no specific data is provided

    // return a  list of all the office records from the database
    const text = 'SELECT * FROM office';

    try {
      const { rows } = await db.query(text);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  // get all offices end

// end of class
}

export default officeController;

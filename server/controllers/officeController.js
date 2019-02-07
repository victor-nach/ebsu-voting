import db from '../models';

class OfficeController {
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
      offices (name, type)
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
    const text = 'SELECT * FROM users WHERE id = $1';

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
    const text = 'SELECT * FROM offices';

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

  /**
    * 3. post - Register a user as a candidate running for a political office
    * @method registerCandidate
    * @parameters {object} req
    * @parameters {object} res
    * @return {json} json containing
  */

  static async registerCandidateForOffice(req, res) {
    // the id of the user to be registered as a candidate is sent as a request parameter
    const { id } = req.params;

    // the id of the user to be registered as a candidate is sent as a request parameter
    const { partyId, officeId } = req.body;

    // return a  list of all the office records from the database
    const text = 'INSERT into candidates (officeId, partyId, userId) values($1, $2, $3) returning *';

    const values = [partyId, officeId, id];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // register candidate for office end

  static async getResult(req, res) {
    // the id of the user to be registered as a candidate is sent as a request parameter
    const { id } = req.params;

    // return a  list of all the office records from the database
    const text = 'SELECT officeid, candidateid, COUNT(candidateid) AS RESULT FROM votes WHERE officeid = $1 GROUP BY candidateid, officeid';

    const values = [id];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 201,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // get results for office

// end of class
}

export default OfficeController;

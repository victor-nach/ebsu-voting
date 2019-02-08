import db from '../models/index';

class voteVerification {
  /**
   * Verify User id existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkUserId(req, res, next) {
    // the user id is expected to be a part of the request body
    const { createdBy } = req.body;

    // query database for vote name
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [createdBy];

    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        // 400 error conflict with current resource
        status: 400,
        message: 'no user with that found',
      });
    }
  } // end of checkuser id

  /**
   * Verify office id existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkOfficeId(req, res, next) {
    // the vote name is expected to be a part of the request body
    const { officeId } = req.body;

    // query database for vote name
    const text = 'SELECT * FROM offices WHERE id = $1';
    const values = [officeId];

    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        // 409 error conflict with current resource
        status: 400,
        message: 'no office found for that id',
      });
    }
  } // end of check id

  /**
   * Verify User id existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkCandidateId(req, res, next) {
    // the user id is expected to be a part of the request body
    const { candidateId } = req.body;

    // query database for vote name
    const text = 'SELECT * FROM candidates WHERE userid = $1';
    const values = [candidateId];

    try {
      const { rows } = await db.query(text, values);
      if (rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        // 400 error conflict with current resource
        status: 400,
        message: 'no candidate with that id found',
      });
    }
  } // end of checkuser id

  static async checkVotes(req, res, next) {
    // the vote name is expected to be a part of the request body
    const { createdBy, candidateId } = req.body;

    // query database for vote name
    const text = 'SELECT * FROM votes where createdby = $1 and officeid = $2';
    const values = [createdBy, candidateId];

    try {
      const { rows } = await db.query(text, values);
      if (rows[1]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(400).json({
        // 409 error conflict with current resource
        status: 400,
        message: 'you cannot vote more than once for the same office',
      });
    }
  } // end of check id
}

export default voteVerification;

import db from '../models/index';

class PartyVerification {
  /**
   * Verify party name existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkNameExists(req, res, next) {
    // the party name is expected to be a part of the request body
    const { name } = req.body;

    // query database for party name
    const text = 'SELECT * FROM parties WHERE name = $1';
    const values = [name];

    try {
      const { rows } = await db.query(text, values);
      if (rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(409).json({
        // 409 error conflict with current resource
        status: 409,
        message: 'Kindly use a different party name, party name already exists in storage',
      });
    }
  } // end of user

  /**
   * Verify party name existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkIdExists(req, res, next) {
    // the party name is expected to be a part of the request body
    const { id } = req.params;

    // query database for party name
    const text = 'SELECT * FROM parties WHERE id = $1';
    const values = [id];

    try {
      const { rows } = await db.query(text, values);
      if (!rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(409).json({
        // 409 error conflict with current resource
        status: 409,
        message: 'Kindly use valid party id, no party with such id found',
      });
    }
  } // end of check id

  /**
   * Verify party name existence
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async checkParamName(req, res, next) {
    // the party name is expected to be a part of the request body
    const { name } = req.params;

    // query database for party name
    const text = 'SELECT * FROM parties WHERE name = $1';
    const values = [name];

    try {
      const { rows } = await db.query(text, values);
      if (rows[0]) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res.status(409).json({
        // 409 error conflict with current resource
        status: 409,
        message: 'Kindly use a different party name, party name already exists in storage',
      });
    }
  } // end of check id
}

export default PartyVerification;

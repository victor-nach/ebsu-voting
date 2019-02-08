import jwt from 'jsonwebtoken';
import db from '../models/index';

class Authenticate {
  /**
   * Verify user Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async verifyUser(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'The token provided is invalid',
        });
      }
      req.user = { id: decoded.userId };
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  static async verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token is not provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.isAdmin === false) {
        return res.status(401).json({
          status: 401,
          error: 'You are not authorized',
        });
      }
      req.user = { isadmin: decoded.isAdmin };
      return next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
  }
}

export default Authenticate;

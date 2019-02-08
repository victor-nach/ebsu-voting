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
      return res.status(403).json({
        status: 403,
        error: 'sorry you are not authorized, no token provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(403).json({
          status: 403,
          error: 'sorry you are not authorized',
        });
      }
      req.user = { id: decoded.userId };
      return next();
    } catch (error) {
      if (error.message === 'jwt malformed') {
        return res.status(403).json({
          status: 403,
          error: 'sorry you are not authorized, the token provide is not of correct type',
        });
      }
      return res.status(403).json({
        status: 403,
        error: 'sorry you are not authorized, the token you have provided is invalid',
      });
    }
  }

  static async verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'sorry you are not authorized, no token provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      if (decoded.isAdmin === false) {
        return res.status(403).json({
          status: 403,
          error: 'You are not an authorized admin',
        });
      }
      req.user = { isadmin: decoded.isAdmin };
      return next();
    } catch (error) {
      return res.status(403).json({
        status: 403,
        error: 'server error',
      });
    }
  }
}

export default Authenticate;

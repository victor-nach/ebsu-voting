import jwt from 'jsonwebtoken';
import db from '../models/index';

class authenticateUser {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  static async verifyToken(req, res, next) {
    // the token is expected to be a part of the header
    const { token } = req.headers;
    if (!token) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(text, [decoded.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default authenticateUser;

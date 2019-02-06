import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class helper {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
  */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword Method
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, bcrypt.genSaltSync);
  }

  /**
   * Is valid email helper Method
   * @param {string} emaila address
   * @returns {Boolean} return True or False
   */
  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  static generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default helper;

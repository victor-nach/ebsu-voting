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
  static comparePassword(hashPadssword, password) {
    return bcrypt.compareSync(password, hashPadssword);
  }

  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  static genrateToken(id, isadmin) {
    const token = jwt.sign({ userId: id, isAdmin: isadmin }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default helper;

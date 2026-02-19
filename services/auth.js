const jwt = require('jsonwebtoken');
const AdminUserDataAccess = require('../data-access/admin-user');
const LogicError = require('../helpers/logic-error');
const { INVALID_CREDENTIALS, NOT_FOUND } = require('../constants/error');
const { jwt: jwtConfig } = require('../config');

class AuthService {
  static async login({ email, password }) {
    const user = await AdminUserDataAccess.findByEmail({ email });
    if (!user) throw new LogicError(INVALID_CREDENTIALS);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new LogicError(INVALID_CREDENTIALS);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn },
    );

    return { token, user: { id: user._id, email: user.email } };
  }

  static async me({ userId }) {
    const user = await AdminUserDataAccess.findById({ id: userId });
    if (!user) throw new LogicError(NOT_FOUND);
    return user;
  }
}

module.exports = AuthService;

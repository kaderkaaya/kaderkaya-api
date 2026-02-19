const UserDataAccess = require('../data-access/user');
const LogicError = require('../helpers/logic-error');
const { USER_NOT_FOUND, DUPLICATE_ENTRY } = require('../constants/error');

class UserService {
  static async getUser({ id }) {
    const user = await UserDataAccess.getUser({ id });

    if (user) {
      logger.debug(user);
      return user;
    }

    throw new LogicError(USER_NOT_FOUND);
  }

  static async createUser({ email, password }) {
    const existing = await UserDataAccess.findByEmail({ email });
    if (existing) throw new LogicError(DUPLICATE_ENTRY);

    const user = await UserDataAccess.create({ email, password });
    return { id: user._id, email: user.email };
  }

  static async serviceCaller({ id }) {
    const response = await AccountServiceCaller.getUser({ id });

    return response.user;
  }
}

module.exports = UserService;

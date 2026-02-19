const UserModel = require('../models/user');

class UserDataAccess {
  static async getUser({ id }) {
    return UserModel.findOne({ _id: id }).cache({ ttl: 70 });
  }

  static async findByEmail({ email }) {
    return UserModel.findOne({ email });
  }

  static async create({ email, password }) {
    return UserModel.create({ email, password });
  }
}

module.exports = UserDataAccess;

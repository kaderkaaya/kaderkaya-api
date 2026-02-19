const UserModel = require('../models/user');

class AdminUserDataAccess {
  static async findByEmail({ email }) {
    return UserModel.findOne({ email });
  }

  static async findById({ id }) {
    return UserModel.findOne({ _id: id }).select('-password');
  }

  static async create({ email, password }) {
    return UserModel.create({ email, password });
  }
}

module.exports = AdminUserDataAccess;

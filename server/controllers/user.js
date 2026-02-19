const UserService = require('../../services/user');

class UserController {
  static async getUser(req, res, next) {
    try {
      const { id } = req.query;
      const user = await UserService.getUser({ id });
      res.response = { user };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.createUser({ email, password });
      res.response = { user };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUser({ id });
      res.response = { user };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async serviceCaller(req, res, next) {
    try {
      const { id } = req.query;
      const user = await UserService.serviceCaller({ id });
      res.response = { user };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = UserController;

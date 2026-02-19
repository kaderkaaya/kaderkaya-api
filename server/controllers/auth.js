const AuthService = require('../../services/auth');

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.response = result;
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getMe(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await AuthService.me({ userId });
      res.response = { user };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = AuthController;

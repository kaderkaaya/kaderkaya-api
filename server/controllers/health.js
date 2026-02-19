class HealthController {
  static async checkHealth(req, res, next) {
    try {
      res.response = { date: new Date() };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = HealthController;

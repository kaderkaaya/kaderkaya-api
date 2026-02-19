const VisitService = require('../../services/visit');

class VisitController {
  static async record(req, res, next) {
    try {
      const { sessionId, path } = req.body;
      await VisitService.record({ sessionId, path });
      res.response = { ok: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getStats(req, res, next) {
    try {
      const days = Math.min(Number(req.query.days) || 7, 30);
      const stats = await VisitService.getStats(days);
      res.response = stats;
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = VisitController;

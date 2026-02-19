const VisitDataAccess = require('../data-access/visit');

class VisitService {
  static async record({ sessionId, path = '/' }) {
    if (!sessionId) return null;
    return VisitDataAccess.create({ sessionId, path });
  }

  static async getStats(days = 7) {
    const [totalVisits, uniqueVisitors, visitsByDay] = await Promise.all([
      VisitDataAccess.getTotalCount(),
      VisitDataAccess.getUniqueVisitorCount(),
      VisitDataAccess.getVisitsByDay(days),
    ]);
    return { totalVisits, uniqueVisitors, visitsByDay };
  }
}

module.exports = VisitService;

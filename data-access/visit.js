const VisitModel = require('../models/visit');

class VisitDataAccess {
  static async create({ sessionId, path = '/' }) {
    return VisitModel.create({ sessionId, path });
  }

  static async getTotalCount() {
    return VisitModel.countDocuments();
  }

  static async getUniqueVisitorCount() {
    const result = await VisitModel.aggregate([
      { $group: { _id: '$sessionId' } },
      { $count: 'count' },
    ]);
    return result[0]?.count ?? 0;
  }

  static async getVisitsByDay(days = 7) {
    const start = new Date();
    start.setDate(start.getDate() - days);
    start.setHours(0, 0, 0, 0);

    const result = await VisitModel.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          visits: { $sum: 1 },
          unique: { $addToSet: '$sessionId' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          visits: 1,
          unique: { $size: '$unique' },
          _id: 0,
        },
      },
    ]);

    return result;
  }
}

module.exports = VisitDataAccess;

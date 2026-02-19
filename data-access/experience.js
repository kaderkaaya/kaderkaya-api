const ExperienceModel = require('../models/experience');

class ExperienceDataAccess {
  static async list() {
    return ExperienceModel.find().sort({ order: 1 });
  }

  static async getById({ id }) {
    return ExperienceModel.findOne({ _id: id });
  }

  static async create(data) {
    return ExperienceModel.create(data);
  }

  static async update({ id, data }) {
    return ExperienceModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async remove({ id }) {
    return ExperienceModel.findOneAndDelete({ _id: id });
  }

  static async reorder(items) {
    const ops = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    return ExperienceModel.bulkWrite(ops);
  }
}

module.exports = ExperienceDataAccess;

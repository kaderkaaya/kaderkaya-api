const ProjectModel = require('../models/project');

class ProjectDataAccess {
  static async list() {
    return ProjectModel.find().sort({ order: 1 });
  }

  static async getById({ id }) {
    return ProjectModel.findOne({ _id: id });
  }

  static async create(data) {
    return ProjectModel.create(data);
  }

  static async update({ id, data }) {
    return ProjectModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async remove({ id }) {
    return ProjectModel.findOneAndDelete({ _id: id });
  }

  static async reorder(items) {
    const ops = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    return ProjectModel.bulkWrite(ops);
  }
}

module.exports = ProjectDataAccess;

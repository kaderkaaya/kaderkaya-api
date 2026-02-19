const Skill = require('../models/skill');

class SkillDataAccess {
  static async list() {
    return Skill.find().sort({ order: 1 });
  }

  static async getById({ id }) {
    return Skill.findOne({ _id: id });
  }

  static async create(data) {
    return Skill.create(data);
  }

  static async update({ id, data }) {
    return Skill.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async remove({ id }) {
    return Skill.findOneAndDelete({ _id: id });
  }

  static async reorder(items) {
    const ops = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    return Skill.bulkWrite(ops);
  }
}

module.exports = SkillDataAccess;

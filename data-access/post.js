const PostModel = require('../models/post');

class PostDataAccess {
  static async list() {
    return PostModel.find().sort({ order: 1 });
  }

  static async getById({ id }) {
    return PostModel.findOne({ _id: id });
  }

  static async create(data) {
    return PostModel.create(data);
  }

  static async update({ id, data }) {
    return PostModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async remove({ id }) {
    return PostModel.findOneAndDelete({ _id: id });
  }

  static async reorder(items) {
    const ops = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    return PostModel.bulkWrite(ops);
  }
}

module.exports = PostDataAccess;

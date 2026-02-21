const BlogPostModel = require('../models/blog-post');

class BlogPostDataAccess {
  static async list() {
    return BlogPostModel.find().sort({ order: 1 });
  }

  static async getById({ id }) {
    return BlogPostModel.findOne({ _id: id });
  }

  static async getBySlug({ slug }) {
    return BlogPostModel.findOne({ slug });
  }

  static async getBySlugAndIncrementReadCount({ slug }) {
    return BlogPostModel.findOneAndUpdate(
      { slug },
      { $inc: { read_count: 1 } },
      { new: true }
    );
  }

  static async create(data) {
    return BlogPostModel.create(data);
  }

  static async update({ id, data }) {
    return BlogPostModel.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async remove({ id }) {
    return BlogPostModel.findOneAndDelete({ _id: id });
  }

  static async reorder(items) {
    const ops = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order } } },
    }));
    return BlogPostModel.bulkWrite(ops);
  }
}

module.exports = BlogPostDataAccess;

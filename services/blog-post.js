const BlogPostDataAccess = require('../data-access/blog-post');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class BlogPostService {
  static async list() {
    return BlogPostDataAccess.list();
  }

  static async getById({ id }) {
    const item = await BlogPostDataAccess.getById({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async getBySlug({ slug }) {
    const item = await BlogPostDataAccess.getBySlug({ slug });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async create(data) {
    return BlogPostDataAccess.create(data);
  }

  static async update({ id, data }) {
    const item = await BlogPostDataAccess.update({ id, data });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async remove({ id }) {
    const item = await BlogPostDataAccess.remove({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async reorder(items) {
    return BlogPostDataAccess.reorder(items);
  }
}

module.exports = BlogPostService;

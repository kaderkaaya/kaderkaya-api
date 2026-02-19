const PostDataAccess = require('../data-access/post');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class PostService {
  static async list() {
    return PostDataAccess.list();
  }

  static async getById({ id }) {
    const item = await PostDataAccess.getById({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async create(data) {
    return PostDataAccess.create(data);
  }

  static async update({ id, data }) {
    const item = await PostDataAccess.update({ id, data });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async remove({ id }) {
    const item = await PostDataAccess.remove({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async reorder(items) {
    return PostDataAccess.reorder(items);
  }
}

module.exports = PostService;

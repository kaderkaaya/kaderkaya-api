const DataAccess = require('../data-access/experience');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class Service {
  static async list() {
    return DataAccess.list();
  }

  static async getById({ id }) {
    const item = await DataAccess.getById({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async create(data) {
    return DataAccess.create(data);
  }

  static async update({ id, data }) {
    const item = await DataAccess.update({ id, data });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async remove({ id }) {
    const item = await DataAccess.remove({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async reorder(items) {
    return DataAccess.reorder(items);
  }
}

module.exports = Service;

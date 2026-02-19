const SkillDataAccess = require('../data-access/skill');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class SkillService {
  static async list() {
    return SkillDataAccess.list();
  }

  static async getById({ id }) {
    const item = await SkillDataAccess.getById({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async create(data) {
    return SkillDataAccess.create(data);
  }

  static async update({ id, data }) {
    const item = await SkillDataAccess.update({ id, data });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async remove({ id }) {
    const item = await SkillDataAccess.remove({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async reorder(items) {
    return SkillDataAccess.reorder(items);
  }
}

module.exports = SkillService;

const ProjectDataAccess = require('../data-access/project');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class ProjectService {
  static async list() {
    return ProjectDataAccess.list();
  }

  static async getById({ id }) {
    const item = await ProjectDataAccess.getById({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async create(data) {
    return ProjectDataAccess.create(data);
  }

  static async update({ id, data }) {
    const item = await ProjectDataAccess.update({ id, data });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async remove({ id }) {
    const item = await ProjectDataAccess.remove({ id });
    if (!item) throw new LogicError(NOT_FOUND);
    return item;
  }

  static async reorder(items) {
    return ProjectDataAccess.reorder(items);
  }
}

module.exports = ProjectService;

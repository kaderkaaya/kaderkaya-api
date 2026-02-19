const SiteSettingDataAccess = require('../data-access/site-setting');
const LogicError = require('../helpers/logic-error');
const { NOT_FOUND } = require('../constants/error');

class SiteSettingService {
  static async get() {
    const result = await SiteSettingDataAccess.get();
    if (!result) throw new LogicError(NOT_FOUND);
    return result;
  }

  static async update({ data }) {
    const result = await SiteSettingDataAccess.update({ data });
    if (!result) throw new LogicError(NOT_FOUND);
    return result;
  }
}

module.exports = SiteSettingService;

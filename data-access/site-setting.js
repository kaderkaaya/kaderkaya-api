const SiteSettingModel = require('../models/site-setting');

class SiteSettingDataAccess {
  static async get() {
    return SiteSettingModel.findOne({});
  }

  static async update({ data }) {
    return SiteSettingModel.findOneAndUpdate(
      {},
      { $set: data },
      { new: true },
    );
  }
}

module.exports = SiteSettingDataAccess;

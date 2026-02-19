const SiteSettingService = require('../../services/site-setting');

class SiteSettingController {
  static async getSiteSettings(req, res, next) {
    try {
      const settings = await SiteSettingService.get();
      res.response = { settings };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updateSiteSettings(req, res, next) {
    try {
      const { name, role, location, summary, avatar_url, email, github_url, linkedin_url, medium_url } = req.body;
      const settings = await SiteSettingService.update({ data: { name, role, location, summary, avatar_url, email, github_url, linkedin_url, medium_url } });
      res.response = { settings };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = SiteSettingController;

const SkillService = require('../../services/skill');

class SkillController {
  static async listSkills(req, res, next) {
    try {
      const items = await SkillService.list();
      res.response = { items };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getSkillById(req, res, next) {
    try {
      const { id } = req.query;
      const item = await SkillService.getById({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createSkill(req, res, next) {
    try {
      const { category, name, icon, order } = req.body;
      const item = await SkillService.create({ category, name, icon, order });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updateSkill(req, res, next) {
    try {
      const { id, category, name, icon, order } = req.body;
      const item = await SkillService.update({ id, data: { category, name, icon, order } });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async deleteSkill(req, res, next) {
    try {
      const { id } = req.body;
      const item = await SkillService.remove({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async reorderSkills(req, res, next) {
    try {
      const { items } = req.body;
      await SkillService.reorder(items);
      res.response = { success: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = SkillController;

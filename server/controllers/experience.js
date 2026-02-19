const ExperienceService = require('../../services/experience');

class ExperienceController {
  static async listExperiences(req, res, next) {
    try {
      const items = await ExperienceService.list();
      res.response = { items };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getExperienceById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await ExperienceService.getById({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createExperience(req, res, next) {
    try {
      const { company, title, location, start_date, end_date, is_current, bullets, technologies, order } = req.body;
      const item = await ExperienceService.create({ company, title, location, start_date, end_date, is_current, bullets, technologies, order });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updateExperience(req, res, next) {
    try {
      const { id } = req.params;
      const { company, title, location, start_date, end_date, is_current, bullets, technologies, order } = req.body;
      const item = await ExperienceService.update({ id, data: { company, title, location, start_date, end_date, is_current, bullets, technologies, order } });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async deleteExperience(req, res, next) {
    try {
      const { id } = req.params;
      const item = await ExperienceService.remove({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async reorderExperiences(req, res, next) {
    try {
      const { items } = req.body;
      await ExperienceService.reorder(items);
      res.response = { success: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = ExperienceController;

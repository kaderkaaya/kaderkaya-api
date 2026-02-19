const ProjectService = require('../../services/project');

class ProjectController {
  static async listProjects(req, res, next) {
    try {
      const items = await ProjectService.list();
      res.response = { items };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getProjectById(req, res, next) {
    try {
      const { id } = req.query;
      const item = await ProjectService.getById({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createProject(req, res, next) {
    try {
      const { name, description, bullets, tags, repo_url, live_url, featured, order } = req.body;
      const item = await ProjectService.create({ name, description, bullets, tags, repo_url, live_url, featured, order });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updateProject(req, res, next) {
    try {
      const { id, name, description, bullets, tags, repo_url, live_url, featured, order } = req.body;
      const item = await ProjectService.update({ id, data: { name, description, bullets, tags, repo_url, live_url, featured, order } });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async deleteProject(req, res, next) {
    try {
      const { id } = req.body;
      const item = await ProjectService.remove({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async reorderProjects(req, res, next) {
    try {
      const { items } = req.body;
      await ProjectService.reorder(items);
      res.response = { success: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = ProjectController;

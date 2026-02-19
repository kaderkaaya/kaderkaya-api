const PostService = require('../../services/post');

class PostController {
  static async listPosts(req, res, next) {
    try {
      const items = await PostService.list();
      res.response = { items };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getPostById(req, res, next) {
    try {
      const { id } = req.query;
      const item = await PostService.getById({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createPost(req, res, next) {
    try {
      const { title, description, cover_image, external_url, published_at, tags, featured, order } = req.body;
      const item = await PostService.create({ title, description, cover_image, external_url, published_at, tags, featured, order });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updatePost(req, res, next) {
    try {
      const { id, title, description, cover_image, external_url, published_at, tags, featured, order } = req.body;
      const item = await PostService.update({ id, data: { title, description, cover_image, external_url, published_at, tags, featured, order } });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.body;
      const item = await PostService.remove({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async reorderPosts(req, res, next) {
    try {
      const { items } = req.body;
      await PostService.reorder(items);
      res.response = { success: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = PostController;

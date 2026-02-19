const BlogPostService = require('../../services/blog-post');

class BlogPostController {
  static async listBlogPosts(req, res, next) {
    try {
      const items = await BlogPostService.list();
      res.response = { items };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getBlogPostById(req, res, next) {
    try {
      const { id } = req.params;
      const item = await BlogPostService.getById({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async getBlogPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const item = await BlogPostService.getBySlug({ slug });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async createBlogPost(req, res, next) {
    try {
      const { title, slug, excerpt, content, cover_image, published_at, tags, order } = req.body;
      const item = await BlogPostService.create({ title, slug, excerpt, content, cover_image, published_at, tags, order });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async updateBlogPost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, slug, excerpt, content, cover_image, published_at, tags, order } = req.body;
      const item = await BlogPostService.update({ id, data: { title, slug, excerpt, content, cover_image, published_at, tags, order } });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async deleteBlogPost(req, res, next) {
    try {
      const { id } = req.params;
      const item = await BlogPostService.remove({ id });
      res.response = { item };
    } catch (e) {
      res.err = e;
    }
    next();
  }

  static async reorderBlogPosts(req, res, next) {
    try {
      const { items } = req.body;
      await BlogPostService.reorder(items);
      res.response = { success: true };
    } catch (e) {
      res.err = e;
    }
    next();
  }
}

module.exports = BlogPostController;

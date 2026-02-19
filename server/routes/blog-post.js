const express = require('express');

const router = express.Router();
const BlogPostController = require('../controllers/blog-post');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const BlogPostValidation = require('../schemas/blog-post');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/list',
  method: 'get',
  validationObject: BlogPostValidation.list,
  controller: BlogPostController.listBlogPosts,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/reorder',
  method: 'post',
  validationObject: BlogPostValidation.reorder,
  controller: BlogPostController.reorderBlogPosts,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/create',
  method: 'post',
  validationObject: BlogPostValidation.create,
  controller: BlogPostController.createBlogPost,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/getBlog',
  method: 'get',
  validationObject: BlogPostValidation.getBySlug,
  controller: BlogPostController.getBlogPostBySlug,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/deleteBlog',
  method: 'post',
  validationObject: BlogPostValidation.remove,
  controller: BlogPostController.deleteBlogPost,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/blogs',
  path: '/updateBlog',
  method: 'post',
  validationObject: BlogPostValidation.update,
  controller: BlogPostController.updateBlogPost,
  isAnonymous: false,
});

module.exports = router;

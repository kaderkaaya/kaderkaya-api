const express = require('express');

const router = express.Router();
const PostController = require('../controllers/post');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const PostValidation = require('../schemas/post');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/list',
  method: 'get',
  validationObject: PostValidation.list,
  controller: PostController.listPosts,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/reorder',
  method: 'post',
  validationObject: PostValidation.reorder,
  controller: PostController.reorderPosts,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/create',
  method: 'post',
  validationObject: PostValidation.create,
  controller: PostController.createPost,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/getPost',
  method: 'get',
  validationObject: PostValidation.getById,
  controller: PostController.getPostById,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/deletePost',
  method: 'post',
  validationObject: PostValidation.remove,
  controller: PostController.deletePost,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/posts',
  path: '/updatePost',
  method: 'post',
  validationObject: PostValidation.update,
  controller: PostController.updatePost,
  isAnonymous: false,
});

module.exports = router;

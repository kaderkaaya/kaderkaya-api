const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const UserValidation = require('../schemas/user');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/user',
  path: '/get',
  method: 'get',
  validationObject: UserValidation.getUser,
  controller: UserController.getUser,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/user',
  path: '/create',
  method: 'post',
  validationObject: UserValidation.create,
  controller: UserController.createUser,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/user',
  path: '/service-caller',
  method: 'get',
  validationObject: UserValidation.serviceCaller,
  controller: UserController.serviceCaller,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/user',
  path: '/getUserById',
  method: 'post',
  validationObject: UserValidation.createWithParam,
  controller: UserController.getUserById,
  isAnonymous: false,
});

module.exports = router;

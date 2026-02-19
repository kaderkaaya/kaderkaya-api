const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/auth');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const AuthValidation = require('../schemas/auth');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/auth',
  path: '/login',
  method: 'post',
  validationObject: AuthValidation.login,
  controller: AuthController.login,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/auth',
  path: '/me',
  method: 'get',
  validationObject: AuthValidation.me,
  controller: AuthController.getMe,
  isAnonymous: false,
});

module.exports = router;

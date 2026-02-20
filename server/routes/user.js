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
  isAnonymous: true,
});

/*BootstrapHelper.createRoute({
  router,
  pathPrefix: '/user',
  path: '/create',
  method: 'post',
  validationObject: UserValidation.create,
  controller: UserController.createUser,
  isAnonymous: true,
});
*/

module.exports = router;

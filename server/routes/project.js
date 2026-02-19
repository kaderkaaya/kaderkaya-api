const express = require('express');

const router = express.Router();
const ProjectController = require('../controllers/project');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const ProjectValidation = require('../schemas/project');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/list',
  method: 'get',
  validationObject: ProjectValidation.list,
  controller: ProjectController.listProjects,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/reorder',
  method: 'post',
  validationObject: ProjectValidation.reorder,
  controller: ProjectController.reorderProjects,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/getProject',
  method: 'get',
  validationObject: ProjectValidation.getById,
  controller: ProjectController.getProjectById,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/create',
  method: 'post',
  validationObject: ProjectValidation.create,
  controller: ProjectController.createProject,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/deleteProject',
  method: 'post',
  validationObject: ProjectValidation.remove,
  controller: ProjectController.deleteProject,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/projects',
  path: '/updateProject',
  method: 'post',
  validationObject: ProjectValidation.update,
  controller: ProjectController.updateProject,
  isAnonymous: false,
});

module.exports = router;

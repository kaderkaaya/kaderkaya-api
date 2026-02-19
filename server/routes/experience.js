const express = require('express');

const router = express.Router();
const ExperienceController = require('../controllers/experience');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const ExperienceValidation = require('../schemas/experience');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/list',
  method: 'get',
  validationObject: ExperienceValidation.list,
  controller: ExperienceController.listExperiences,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/',
  method: 'get',
  validationObject: ExperienceValidation.getById,
  controller: ExperienceController.getExperienceById,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/create',
  method: 'post',
  validationObject: ExperienceValidation.create,
  controller: ExperienceController.createExperience,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/update',
  method: 'post',
  validationObject: ExperienceValidation.update,
  controller: ExperienceController.updateExperience,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/delete',
  method: 'post',
  validationObject: ExperienceValidation.remove,
  controller: ExperienceController.deleteExperience,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experience',
  path: '/reorder',
  method: 'post',
  validationObject: ExperienceValidation.reorder,
  controller: ExperienceController.reorderExperiences,
  isAnonymous: false,
});

module.exports = router;

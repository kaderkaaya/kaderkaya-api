const express = require('express');

const router = express.Router();
const ExperienceController = require('../controllers/experience');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const ExperienceValidation = require('../schemas/experience');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/list',
  method: 'get',
  validationObject: ExperienceValidation.list,
  controller: ExperienceController.listExperiences,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/reorder',
  method: 'post',
  validationObject: ExperienceValidation.reorder,
  controller: ExperienceController.reorderExperiences,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/getExperience',
  method: 'get',
  validationObject: ExperienceValidation.getById,
  controller: ExperienceController.getExperienceById,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/create',
  method: 'post',
  validationObject: ExperienceValidation.create,
  controller: ExperienceController.createExperience,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/deleteExperience',
  method: 'post',
  validationObject: ExperienceValidation.remove,
  controller: ExperienceController.deleteExperience,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/experiences',
  path: '/updateExperience',
  method: 'post',
  validationObject: ExperienceValidation.update,
  controller: ExperienceController.updateExperience,
  isAnonymous: false,
});

module.exports = router;

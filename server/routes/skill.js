const express = require('express');

const router = express.Router();
const SkillController = require('../controllers/skill');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const SkillValidation = require('../schemas/skill');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/list',
  method: 'get',
  validationObject: SkillValidation.list,
  controller: SkillController.listSkills,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/',
  method: 'get',
  validationObject: SkillValidation.getById,
  controller: SkillController.getSkillById,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/create',
  method: 'post',
  validationObject: SkillValidation.create,
  controller: SkillController.createSkill,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/update',
  method: 'post',
  validationObject: SkillValidation.update,
  controller: SkillController.updateSkill,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/delete',
  method: 'post',
  validationObject: SkillValidation.remove,
  controller: SkillController.deleteSkill,
  isAnonymous: false,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/skill',
  path: '/reorder',
  method: 'post',
  validationObject: SkillValidation.reorder,
  controller: SkillController.reorderSkills,
  isAnonymous: false,
});

module.exports = router;

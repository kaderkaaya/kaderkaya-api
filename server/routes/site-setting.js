const express = require('express');

const router = express.Router();
const SiteSettingController = require('../controllers/site-setting');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const SiteSettingValidation = require('../schemas/site-setting');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/setting',
  path: '/list',
  method: 'get',
  validationObject: SiteSettingValidation.get,
  controller: SiteSettingController.getSiteSettings,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/setting',
  path: '/update',
  method: 'post',
  validationObject: SiteSettingValidation.update,
  controller: SiteSettingController.updateSiteSettings,
  isAnonymous: false,
});

module.exports = router;

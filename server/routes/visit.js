const express = require('express');

const router = express.Router();
const VisitController = require('../controllers/visit');
const BootstrapHelper = require('../../helpers/bootstrap-helper');
const VisitValidation = require('../schemas/visit');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/visit',
  path: '/',
  method: 'post',
  validationObject: VisitValidation.record,
  controller: VisitController.record,
  isAnonymous: true,
});

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/visit',
  path: '/stats',
  method: 'get',
  validationObject: VisitValidation.stats,
  controller: VisitController.getStats,
  isAnonymous: false,
});

module.exports = router;

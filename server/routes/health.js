const express = require('express');

const router = express.Router();
const HealthController = require('../controllers/health');
const BootstrapHelper = require('../../helpers/bootstrap-helper');

BootstrapHelper.createRoute({
  router,
  pathPrefix: '/health',
  path: '/',
  method: 'get',
  controller: HealthController.checkHealth,
  isAnonymous: true,
});

module.exports = router;

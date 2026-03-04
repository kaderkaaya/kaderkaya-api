const axios = require('axios');
const { logger } = require('../helpers/logger');
const config = require('../config');

const HEALTH_CHECK_INTERVAL_MS = 5 * 60 * 1000;

function startHealthCron(port) {
  const baseUrl = config.healthCron?.baseUrl || `http:localhost:${port}`;
  const healthUrl = baseUrl.replace(/\/$/, '') + '/health';

  function pingHealth() {
    axios.get(healthUrl, { timeout: 10000 })
      .then((res) => {
        if (res.status === 200) {
          logger.debug('[health-cron] Health check OK');
        } else {
          logger.warn('[health-cron] Health check returned status %s', res.status);
        }
      })
      .catch((err) => {
        logger.warn('[health-cron] Health check failed: %s', err.message);
      });
  }

  const initialDelay = 60 * 1000;
  setTimeout(() => {
    pingHealth();
    setInterval(pingHealth, HEALTH_CHECK_INTERVAL_MS);
  }, initialDelay);

  logger.debug('[health-cron] Started (every 5 minutes)');
}

module.exports = { startHealthCron };

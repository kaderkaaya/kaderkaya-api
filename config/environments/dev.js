module.exports = {
  env: 'dev',
  mongodb: {
    poolSize: 4,
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  swagger: {
    isActive: process.env.IS_SWAGGER_ACTIVE || true,
  },
};

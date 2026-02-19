const pkg = require('../package.json');

const name = process.env.NAME || pkg.name;
const version = process.env.VERSION || pkg.version;
const env = process.env.NODE_ENV || 'dev';

module.exports = {
  name,
  version,
  env,
  newRelic: {
    appName: process.env.NEW_RELIC_APP_NAME || name,
    licenseKey: process.env.NEW_RELIC_LICENSE_KEY || '',
    enabled: (process.env.NEW_RELIC_ENABLED || 'false').trim().toLowerCase() === 'true',
    labels: {
      version: process.env.NEW_RELIC_VERSION || version,
    },
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    release: process.env.SENTRY_RELEASE || `${name}@${version}`,
    environment: process.env.SENTRY_ENVIRONMENT || env,
  },
  mongodb: {
    url: process.env.MONGODB_URL || '',
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
  },
  redis: {
    url: process.env.REDIS_URL || '',
    reconnectTries: Number.MAX_VALUE,
    reconnectAfter: 500,
    reconnectTimeout: 30000,
  },
  server: {
    port: +(process.env.SERVER_PORT || process.env.PORT || 8080),
    keepAliveTimeout: +(process.env.SERVER_KEEP_ALIVE_TIMEOUT || 120000),
  },
  microservice: {
    urls: {
      account: process.env.MICROSERVICE_URLS_ACCOUNT || '',
    },
    timeout: +(process.env.MICROSERVICE_TIMEOUT || 10000),
  },
  log: {
    name,
    version,
    env,
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    isActive: process.env.IS_SWAGGER_ACTIVE,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@kaderkaya.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  },
};

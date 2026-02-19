const winston = require('winston');
const { log } = require('../config');

class LoggerHelper {
  static logger;

  static createLogger() {
    if (!LoggerHelper.logger) {
      LoggerHelper.logger = winston.createLogger({
        level: log.level,
        format: winston.format.json(),
        defaultMeta: { service: log.name },
        transports: [
          new winston.transports.Console(),
        ],
      });
    }
  }
}

module.exports = LoggerHelper;

const Sentry = require('@sentry/node');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('joi');
const LogicError = require('./logic-error');
const ERRORS = require('../constants/error');
const LoggerHelper = require('./logger');
const { jwt: jwtConfig } = require('../config');

class RequestHelper {
  static async handleResponse(req, res) {
    if (res.response) {
      return res.send({ meta: { statusCode: 0, message: 'Success' }, data: res.response });
    }
    if (res.err) {
      if (res.err instanceof ValidationError) {
        return res.status(500).send({ meta: { statusCode: ERRORS.VALIDATION_ERROR.code, message: res.err.message }, data: {} });
      }
      if (res.err instanceof LogicError) {
        return res.status(500).send({ meta: { statusCode: res.err.code, message: res.err.message }, data: {} });
      }
    }
    if (res.err.microservice) {
      return res.status(500).send({ meta: { statusCode: res.err.code, message: res.err.message }, data: res.err.data });
    }
    LoggerHelper.logger.error(res.err.stack);
    Sentry.captureException(res.err);
    return res.status(500).send({ meta: { statusCode: ERRORS.UNKNOWN.code, message: ERRORS.UNKNOWN.message }, data: {} });
  }

  static async checkJwtAuth(req, res, next) {
    try {
      const authHeader = req.headers.token;
      req.user = jwt.verify(authHeader, jwtConfig.secret);
      return next();
    } catch (e) {
      res.err = new LogicError(ERRORS.UNAUTHORIZED);
      return next();
    }
  }

  static async validateRequest(req, res, next, validationObject) {
    if (validationObject?.headers) {
      console.log(req.headers);
      const { error } = validationObject.headers.validate(req.headers);
      if (error) {
        console.log(error);
        res.err = error;
      }
    }
    if (validationObject?.body) {
      const { error } = validationObject.body.validate(req.body);
      if (error) {
        res.err = error;
      }
    }
    if (validationObject?.query) {
      const { error } = validationObject.query.validate(req.query);
      if (error) {
        res.err = error;
      }
    }
    return next();
  }

  static async logRequest(req, res) {
    try {
      LoggerHelper.logger.debug({
        statusCode: res.statusCode,
        route: req.baseUrl + req.route.path,
        path: req.originalUrl,
        method: req.method,
        requestTime: Date.now() - req.requestDate.getTime(),
        query: req.query,
        params: req.params,
        body: req.body,
        response: res.body,
      });
    }
    catch (e) { /* no need to handle */ }

    // console.log(req.requestDate, req.query);
  }
}

module.exports = RequestHelper;

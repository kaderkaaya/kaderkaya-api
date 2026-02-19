/* eslint-disable prefer-rest-params */
// eslint-disable-next-line max-classes-per-file
const mongoose = require('mongoose');
const j2s = require('joi-to-swagger');
const fs = require('fs');
const Joi = require('joi');
const crypto = require('crypto');
const packageJson = require('../package.json');
const { mongodb } = require('../config');
const RequestHelper = require('./request-helper');
const Logger = require('./logger');

Logger.createLogger();

class BootstrapHelper {
  static async bootstrapStart() {
    await BootstrapHelper.#connectDatabase();
  }

  static async #connectDatabase() {
    await mongoose.connect(mongodb.url);
  }

  static #pathDefinitions = {};

  static createRoute({
    router,
    pathPrefix = '',
    path,
    method,
    validationObject,
    isAnonymous,
    controller,
  }) {
    const middlewares = [];

    if (validationObject && validationObject.request) {
      middlewares.push((req, res, next) => RequestHelper.validateRequest(req, res, next, validationObject.request));
    }

    if (!isAnonymous) {
      middlewares.push((req, res, next) => (res.err ? next() : RequestHelper.checkJwtAuth(req, res, next)));
    }

    middlewares.push((req, res, next) => (res.err ? next() : controller(req, res, next)));

    middlewares.push(RequestHelper.handleResponse);

    router[method](
      path,
      ...middlewares,
    );

    let fullPath = `${pathPrefix}${path}`;

    if (validationObject?.request?.parameters) {
      const { swagger } = j2s(validationObject.request.parameters);
      Object.keys(swagger.properties).forEach((r) => {
        fullPath = fullPath.replace(`:${r}`, `{${r}}`);
      });
    }

    if (!BootstrapHelper.#pathDefinitions[fullPath]) {
      BootstrapHelper.#pathDefinitions[fullPath] = {};
    }

    BootstrapHelper.#pathDefinitions[fullPath][method] = {
      tags: [pathPrefix.replace('/', '')],
      parameters: [],
    };

    if (validationObject?.request?.headers) {
      const { swagger } = j2s(validationObject.request.headers);
      BootstrapHelper.#pathDefinitions[fullPath][method].parameters.push(...Object.keys(swagger.properties)
        .map((r) => ({
          name: r,
          in: 'header',
          schema: {
            type: swagger.properties[r].type,
          },
        })));
    }

    if (validationObject?.request?.query) {
      const { swagger } = j2s(validationObject.request.query);
      BootstrapHelper.#pathDefinitions[fullPath][method].parameters.push(...Object.keys(swagger.properties)
        .map((r) => ({
          name: r,
          in: 'query',
          schema: {
            type: swagger.properties[r].type,
          },
        })));
    }

    if (validationObject?.request?.parameters) {
      const { swagger } = j2s(validationObject.request.parameters);
      BootstrapHelper.#pathDefinitions[fullPath][method].parameters.push(...Object.keys(swagger.properties)
        .map((r) => ({
          name: r,
          in: 'path',
          schema: {
            type: swagger.properties[r].type,
          },
        })));
    }

    if (validationObject?.request?.body) {
      const { swagger } = j2s(validationObject.request.body);
      BootstrapHelper.#pathDefinitions[fullPath][method].requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: swagger,
          },
        },

      };
    }

    if (validationObject?.response) {
      const { swagger } = j2s(validationObject.response);
      BootstrapHelper.#pathDefinitions[fullPath][method].responses = {
        200: {
          content: {
            'application/json': {
              schema: swagger,
            },
          },
        },
      };
    }
    else {
      BootstrapHelper.#pathDefinitions[fullPath][method].responses = {
        200: {
          content: {
            'application/json': {
              schema: Joi.object(),
            },
          },
        },
      };
    }
  }

  static createSwaggerJson() {
    const swaggerJson = {
      openapi: '3.0.0',
      info: {
        title: packageJson.name,
        description: packageJson.description,
        version: packageJson.version,
        contact: {},
      },
      servers: [{
        url: '/',
        description: 'local',
      }],
      paths: BootstrapHelper.#pathDefinitions,
    };
    fs.writeFileSync('swagger.json', JSON.stringify(swaggerJson));
  }
}

const addUpdateOptionNew = (schema) => {
  schema.pre('findOneAndUpdate', function addUpdateOptionNewPreFindOneAndUpdate(next) {
    if (this.options.new === undefined) {
      this.findOneAndUpdate({}, {}, { new: true });
    }

    next();
  });
};

const addUpdatedAt = (schema) => {
  schema.pre('findOneAndUpdate', function addUpdatedAtPreFindOneAndUpdate(next) {
    this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } });
    next();
  });

  schema.pre('update', function addUpdatedAtPreUpdate(next) {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
  });
};

mongoose.plugin(addUpdateOptionNew);
mongoose.plugin(addUpdatedAt);

// eslint-disable-next-line no-extend-native
Date.prototype.toJSON = function () {
  return this.getTime();
};

const { exec } = mongoose.Query.prototype;
const { exec: aggregateExec } = mongoose.Aggregate.prototype;

// eslint-disable-next-line no-multi-assign
mongoose.Query.prototype.cache = function (options = { ttl: 60 }) {
  this.useCache = true;
  this.ttl = options.ttl;
  return this;
};

mongoose.Aggregate.prototype.cache = function (options = { ttl: 60 }) {
  this.useCache = true;
  this.ttl = options.ttl;
  return this;
};

mongoose.Aggregate.prototype.exec = async function () {
  if (!this.useCache) {
    return aggregateExec.apply(this, arguments);
  }
  const result = await aggregateExec.apply(this, arguments);
  return result;
};
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const result = await exec.apply(this, arguments);
  return result;
};

module.exports = BootstrapHelper;

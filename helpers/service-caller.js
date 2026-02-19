const axios = require('axios');
const { ObjectId } = require('mongoose').Schema.Types;
const LoggerHelper = require('./logger');
const config = require('../config').microservice;

const { MICROSERVICE } = require('../constants/error');

module.exports = class ServiceCaller {
  static #deepObjectIdToString = (value) => {
    if (value instanceof ObjectId) {
      return value.toString();
    }

    if (Array.isArray(value)) {
      return value.map(ServiceCaller.#deepObjectIdToString);
    }

    if (value instanceof Object) {
      return (
        Object.entries(value)
          .reduce((acc, [innerKey, innerValue]) => ({
            ...acc,
            [innerKey]: ServiceCaller.#deepObjectIdToString(innerValue),
          }), {})
      );
    }

    return value;
  };

  static #generateErrorFunction(microservice, request) {
    // eslint-disable-next-line default-param-last
    return function generateServiceCallerError(message = MICROSERVICE.message, code = MICROSERVICE.code, data) {
      const error = new Error(message);
      error.microservice = microservice;
      error.serviceCallerRequest = request;
      error.code = code;
      error.data = data;
      // service return non 200 response with error code
      error.isOriginatedFromAnotherService = code !== MICROSERVICE.code;

      return error;
    };
  }

  static async request(microservice, method, path, data = {}, params = {}, headers = {}, timeout = config.timeout) {
    const url = `${config.urls[microservice]}${path}`;

    const start = new Date();
    const request = {
      method,
      url,
      data,
      params: ServiceCaller.#deepObjectIdToString(params),
      headers,
      timeout,
      validateStatus: () => true,
    };

    const generateError = ServiceCaller.#generateErrorFunction(microservice, request);
    return axios(request)
      .catch((error) => {
        throw generateError(error.message);
      })
      .then((response) => {
        const elapsed = (+new Date()) - (+start);
        LoggerHelper.logger.debug('service caller response', {
          microservice,
          method,
          url,
          data,
          params,
          headers,
          start,
          elapsed,
          status: response.status,
        });

        if (response.status === 200) {
          return response.data?.data;
        }

        if (response?.data?.meta?.statusCode) {
          throw generateError(response.data.meta.message, response.data.meta.statusCode, response.data.data);
        }

        throw generateError();
      });
  }
};

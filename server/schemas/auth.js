const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

module.exports = {
  login: {
    request: {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        token: Joi.string(),
        user: Joi.object({
          id: Joi.string(),
          email: Joi.string(),
        }),
      }),
    }),
  },
  me: {
    request: {
      headers: jwtHeaderScheme,
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        user: Joi.object({
          _id: Joi.string(),
          email: Joi.string(),
        }),
      }),
    }),
  },
};
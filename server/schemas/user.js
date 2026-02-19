const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

module.exports = {
  getUser: {
    request: {
      query: Joi.object({
        id: Joi.string().required().description('id of the user'),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        user: Joi.object({
          _id: Joi.string().description('id of the user'),
          email: Joi.string().description('email of the user'),
        }),
      }),
    },
  },
  create: {
    request: {
      body: Joi.object({
        email: Joi.string().email().required().description('email of the user'),
        password: Joi.string().min(6).required().description('password of the user'),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        user: Joi.object({
          id: Joi.string().description('id of the created user'),
          email: Joi.string().description('email of the created user'),
        }),
      }),
    },
  },
};

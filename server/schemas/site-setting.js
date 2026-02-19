const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const siteSettingBodySchema = Joi.object({
  name: Joi.string().optional(),
  role: Joi.string().optional(),
  location: Joi.string().optional(),
  summary: Joi.string().optional(),
  avatar_url: Joi.string().allow(null).optional(),
  email: Joi.string().optional(),
  github_url: Joi.string().optional(),
  linkedin_url: Joi.string().optional(),
  medium_url: Joi.string().optional(),
}).min(1);

const siteSettingResponseSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
  role: Joi.string(),
  location: Joi.string(),
  summary: Joi.string(),
  avatar_url: Joi.string().allow(null),
  email: Joi.string(),
  github_url: Joi.string(),
  linkedin_url: Joi.string(),
  medium_url: Joi.string(),
});

module.exports = {
  get: {
    request: {},
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        settings: siteSettingResponseSchema,
      }),
    },
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      body: siteSettingBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        settings: siteSettingResponseSchema,
      }),
    },
  },
};

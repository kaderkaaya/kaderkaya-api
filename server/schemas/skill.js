const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const skillCreateBodySchema = Joi.object({
  category: Joi.string().required(),
  name: Joi.string().required(),
  icon: Joi.string().required(),
  order: Joi.number().required(),
});

const skillUpdateBodySchema = Joi.object({
  category: Joi.string(),
  name: Joi.string(),
  icon: Joi.string(),
  order: Joi.number(),
}).min(1);

const skillResponseSchema = Joi.object({
  _id: Joi.string(),
  category: Joi.string(),
  name: Joi.string(),
  icon: Joi.string(),
  order: Joi.number(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const reorderBodySchema = Joi.object({
  items: Joi.array().items(Joi.object({
    id: Joi.string().required(),
    order: Joi.number().required(),
  })).required(),
});

module.exports = {
  list: {
    request: {},
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        items: Joi.array().items(skillResponseSchema),
      }),
    },
  },
  getById: {
    request: {
      parameters: Joi.object({
        id: Joi.string().required(),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: skillResponseSchema,
      }),
    },
  },
  create: {
    request: {
      headers: jwtHeaderScheme,
      body: skillCreateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: skillResponseSchema,
      }),
    },
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      parameters: Joi.object({
        id: Joi.string().required(),
      }),
      body: skillUpdateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: skillResponseSchema,
      }),
    },
  },
  remove: {
    request: {
      headers: jwtHeaderScheme,
      parameters: Joi.object({
        id: Joi.string().required(),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: skillResponseSchema,
      }),
    },
  },
  reorder: {
    request: {
      headers: jwtHeaderScheme,
      body: reorderBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        success: Joi.boolean(),
      }),
    },
  },
};

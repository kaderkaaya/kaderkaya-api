const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const experienceItemSchema = Joi.object({
  _id: Joi.string(),
  company: Joi.string(),
  title: Joi.string(),
  location: Joi.string(),
  start_date: Joi.string(),
  end_date: Joi.string().allow(null),
  is_current: Joi.boolean(),
  bullets: Joi.array().items(Joi.string()),
  technologies: Joi.array().items(Joi.string()),
  order: Joi.number(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const createBodySchema = Joi.object({
  company: Joi.string().required(),
  title: Joi.string().required(),
  location: Joi.string().required(),
  start_date: Joi.string().required(),
  end_date: Joi.string().allow(null).optional(),
  is_current: Joi.boolean().optional(),
  bullets: Joi.array().items(Joi.string()).required(),
  technologies: Joi.array().items(Joi.string()).required(),
  order: Joi.number().required(),
});

const updateBodySchema = Joi.object({
  company: Joi.string().optional(),
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  start_date: Joi.string().optional(),
  end_date: Joi.string().allow(null).optional(),
  is_current: Joi.boolean().optional(),
  bullets: Joi.array().items(Joi.string()).optional(),
  technologies: Joi.array().items(Joi.string()).optional(),
  order: Joi.number().optional(),
}).min(1);

const reorderBodySchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      order: Joi.number().required(),
    }),
  ).required(),
});

module.exports = {
  list: {
    request: {},
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        items: Joi.array().items(experienceItemSchema),
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
        item: experienceItemSchema,
      }),
    },
  },
  create: {
    request: {
      headers: jwtHeaderScheme,
      body: createBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: experienceItemSchema,
      }),
    },
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      parameters: Joi.object({
        id: Joi.string().required(),
      }),
      body: updateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: experienceItemSchema,
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
        item: experienceItemSchema,
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

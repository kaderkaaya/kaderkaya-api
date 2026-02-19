const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const postCreateBodySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  cover_image: Joi.string().allow(null).allow(''),
  external_url: Joi.string().uri().required(),
  published_at: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  featured: Joi.boolean(),
  order: Joi.number().required(),
});

const postUpdateBodySchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  cover_image: Joi.string().allow(null).allow(''),
  external_url: Joi.string().uri(),
  published_at: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  featured: Joi.boolean(),
  order: Joi.number(),
});

const postDeleteBodySchema = Joi.object({
  id: Joi.string().required(),
});

const postResponseSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  cover_image: Joi.string().allow(null),
  external_url: Joi.string(),
  published_at: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  featured: Joi.boolean(),
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
        items: Joi.array().items(postResponseSchema),
      }),
    },
  },
  getById: {
    request: {
      query: Joi.object({
        id: Joi.string().required(),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: postResponseSchema,
      }),
    },
  },
  create: {
    request: {
      headers: jwtHeaderScheme,
      body: postCreateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: postResponseSchema,
      }),
    },
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      body: postUpdateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: postResponseSchema,
      }),
    },
  },
  remove: {
    request: {
      headers: jwtHeaderScheme,
      body: postDeleteBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: postResponseSchema,
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

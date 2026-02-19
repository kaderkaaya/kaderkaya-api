const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const blogPostCreateBodySchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  excerpt: Joi.string().required(),
  content: Joi.string().required(),
  cover_image: Joi.string().allow(null).allow(''),
  published_at: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  order: Joi.number().required(),
});

const blogPostUpdateBodySchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string(),
  slug: Joi.string(),
  excerpt: Joi.string(),
  content: Joi.string(),
  cover_image: Joi.string().allow(null).allow(''),
  published_at: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  order: Joi.number(),
});

const blogPostDeleteBodySchema = Joi.object({
  id: Joi.string().required(),
});

const blogPostResponseSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string(),
  slug: Joi.string(),
  excerpt: Joi.string(),
  content: Joi.string(),
  cover_image: Joi.string().allow(null),
  published_at: Joi.string(),
  tags: Joi.array().items(Joi.string()),
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
        items: Joi.array().items(blogPostResponseSchema),
      }),
    },
  },
  getBySlug: {
    request: {
      query: Joi.object({
        slug: Joi.string().required(),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: blogPostResponseSchema,
      }),
    },
  },
  create: {
    request: {
      headers: jwtHeaderScheme,
      body: blogPostCreateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: blogPostResponseSchema,
      }),
    },
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      body: blogPostUpdateBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: blogPostResponseSchema,
      }),
    },
  },
  remove: {
    request: {
      headers: jwtHeaderScheme,
      body: blogPostDeleteBodySchema,
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        item: blogPostResponseSchema,
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

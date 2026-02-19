const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

const projectItemSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  bullets: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string()),
  repo_url: Joi.string().allow(null, ''),
  live_url: Joi.string().allow(null, ''),
  featured: Joi.boolean(),
  order: Joi.number(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const projectCreateBodySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  bullets: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()).required(),
  repo_url: Joi.string().allow(null, '').optional(),
  live_url: Joi.string().allow(null, '').optional(),
  featured: Joi.boolean().optional(),
  order: Joi.number().required(),
});

const projectUpdateBodySchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  bullets: Joi.array().items(Joi.string()).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  repo_url: Joi.string().allow(null, '').optional(),
  live_url: Joi.string().allow(null, '').optional(),
  featured: Joi.boolean().optional(),
  order: Joi.number().optional(),
});

const projectDeleteBodySchema = Joi.object({
  id: Joi.string().required(),
});

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
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        items: Joi.array().items(projectItemSchema),
      }),
    }),
  },
  getById: {
    request: {
      query: Joi.object({
        id: Joi.string().required(),
      }),
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        item: projectItemSchema,
      }),
    }),
  },
  create: {
    request: {
      headers: jwtHeaderScheme,
      body: projectCreateBodySchema,
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        item: projectItemSchema,
      }),
    }),
  },
  update: {
    request: {
      headers: jwtHeaderScheme,
      body: projectUpdateBodySchema,
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        item: projectItemSchema,
      }),
    }),
  },
  remove: {
    request: {
      headers: jwtHeaderScheme,
      body: projectDeleteBodySchema,
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        item: projectItemSchema,
      }),
    }),
  },
  reorder: {
    request: {
      headers: jwtHeaderScheme,
      body: reorderBodySchema,
    },
    response: Joi.object({
      meta: responseMetaScheme,
      data: Joi.object({
        success: Joi.boolean(),
      }),
    }),
  },
};

const Joi = require('joi');
const jwtHeaderScheme = require('./models/header');
const responseMetaScheme = require('./models/response-meta');

module.exports = {
  record: {
    request: {
      body: Joi.object({
        sessionId: Joi.string().required(),
        path: Joi.string().optional().default('/'),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({ ok: Joi.boolean() }),
    },
  },
  stats: {
    request: {
      headers: jwtHeaderScheme,
      query: Joi.object({
        days: Joi.number().integer().min(1).max(30).optional(),
      }),
    },
    response: {
      meta: responseMetaScheme,
      data: Joi.object({
        totalVisits: Joi.number(),
        uniqueVisitors: Joi.number(),
        visitsByDay: Joi.array().items(
          Joi.object({
            date: Joi.string(),
            visits: Joi.number(),
            unique: Joi.number(),
          })
        ),
      }),
    },
  },
};

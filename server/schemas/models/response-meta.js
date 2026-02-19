const Joi = require('joi');

module.exports = Joi.object({
  statusCode: Joi.number().description('status code of the response'),
  message: Joi.string().description('message'),
});

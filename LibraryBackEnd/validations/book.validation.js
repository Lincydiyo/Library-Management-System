const Joi = require("joi");

const registerBookSchema = Joi.object({
  bookName: Joi.string().required(),
  authorName: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  published: Joi.string().required(),
  image: Joi.object().optional(),
});

const updateBookSchema = Joi.object({
  bookName: Joi.string().optional(),
  authorName: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  published: Joi.string().optional(),
  image: Joi.object().optional(),
});

module.exports = {
  registerBookSchema,
  updateBookSchema,
};

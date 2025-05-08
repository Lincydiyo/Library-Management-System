const Joi = require("joi");
const moment = require("moment");

const bookName = Joi.string()
  .pattern(/^[A-Za-z\s.]+$/)
  .message("Book Name must be alphabetic letters");

const authorName = Joi.string()
  .pattern(/^[A-Za-z\s.]+$/)
  .message("Author Name must be alphabetic letters");

const publishedDate = Joi.string().custom((value, helpers) => {
  const isValidFormat = moment(value, "DD-MM-YYYY", true).isValid();
  if (!isValidFormat) {
    return helpers.message("Published date must be in DD-MM-YYYY format");
  }

  const isFuture = moment(value, "DD-MM-YYYY").isAfter(moment());
  if (isFuture) {
    return helpers.message("Published date must not be in the future");
  }

  return value;
});

const registerBookSchema = Joi.object({
  bookName: bookName.required(),
  authorName: authorName.required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  published: publishedDate.required(),
  image: Joi.object().optional(),
});

const updateBookSchema = Joi.object({
  bookName: bookName.optional(),
  authorName: authorName.optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  published: publishedDate.optional(),
  image: Joi.object().optional(),
});

module.exports = {
  registerBookSchema,
  updateBookSchema,
};

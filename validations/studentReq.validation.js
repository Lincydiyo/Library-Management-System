const Joi = require("joi");

const studentBookReqValidations = Joi.object({
  bookId: Joi.string().required(),
  studentId: Joi.string().required(),
});

module.exports = {
  studentBookReqValidations,
};

const Joi = require("joi");

const teacherBookReqValidations = Joi.object({
  bookId: Joi.string().required(),
  teacherId: Joi.string().required(),
});

module.exports = {
  teacherBookReqValidations,
};

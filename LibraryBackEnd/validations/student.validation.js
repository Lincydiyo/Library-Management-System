const Joi = require("joi");

const registerStudentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .message("Password length should be atleast  8 digits")
    .required(),
  image: Joi.object().optional(),
  dob: Joi.string().required(),
  department: Joi.string().required(),
  phoneno: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be exactly 10 digits")
    .required(),
  semester: Joi.string().required(),
});

const loginStudentSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateStudentSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(8).optional(),
  dob: Joi.string().optional(),
  department: Joi.string().optional(),
  phoneno: Joi.number().optional(),
  semester: Joi.string().optional(),
});

module.exports = {
  registerStudentSchema,
  loginStudentSchema,
  updateStudentSchema,
};

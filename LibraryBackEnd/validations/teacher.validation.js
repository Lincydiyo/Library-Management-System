const Joi = require("joi");

const registerTeacherSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,30}$/)
    .message("Password length should be atleast  8 digits")
    .required(),
  image: Joi.object().optional(),
  department: Joi.string().required(),
  phoneno: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message("Phone number must be exactly 10 digits")
    .required(),
});

const loginTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateTeacherSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  image: Joi.object().optional(),
  department: Joi.string().optional(),
  phoneno: Joi.number().optional(),
});

module.exports = {
  registerTeacherSchema,
  loginTeacherSchema,
  updateTeacherSchema,
};

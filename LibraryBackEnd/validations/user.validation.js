const Joi = require("joi");

// Common validation rules
const passwordRule = Joi.string()
  .pattern(/^[a-zA-Z0-9]{8,30}$/)
  .message("Password should be 8-30 characters and alphanumeric");

const phoneRule = Joi.string()
  .pattern(/^[0-9]{10}$/)
  .message("Phone number must be exactly 10 digits");

// Student Schemas
const registerStudentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordRule.required(),
  image: Joi.object().optional(),
  dob: Joi.string().required(),
  department: Joi.string().required(),
  phoneno: phoneRule.required(),
  semester: Joi.string().required(),
  role: Joi.string().valid("student").required(),
});

const loginStudentSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("student").required(),
});

const updateStudentSchema = Joi.object({
  role: Joi.string().valid("student").required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  dob: Joi.string().required(),
  department: Joi.string().required(),
  phoneno: Joi.string().required(),
  semester: Joi.string().required(),
});

// Teacher Schemas
const registerTeacherSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: passwordRule.required(),
  image: Joi.object().optional(),
  department: Joi.string().required(),
  phoneno: phoneRule.required(),
  role: Joi.string().valid("teacher").required(),
});

const loginTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("teacher").required(),
});

const updateTeacherSchema = Joi.object({
  role: Joi.string().valid("teacher").required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  department: Joi.string().required(),
  phoneno: Joi.string().required(),
});

module.exports = {
  registerStudentSchema,
  loginStudentSchema,
  updateStudentSchema,
  registerTeacherSchema,
  loginTeacherSchema,
  updateTeacherSchema,
};

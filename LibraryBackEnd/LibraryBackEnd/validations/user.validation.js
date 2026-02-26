const Joi = require("joi");

// Common validation rules
const emailRule = Joi.string()
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|edu)$/)
  .message("Email must be a valid address ");

const passwordRule = Joi.string()
  .pattern(/^[a-zA-Z0-9]{8,30}$/)
  .message("Password should be 8-30 characters and alphanumeric");

const phoneRule = Joi.string()
  .pattern(/^(?!.*(\d)\1{9})\d{10}$/)
  .message("Phone number must be exactly 10 digits and not all same digits");

const usernameRule = Joi.string()
  .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
  .message("Name must be alphabetic characters");

const departmentRule = Joi.string()
  .pattern(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
  .message("Department must contain only letters");

// Student Schemas
const registerStudentSchema = Joi.object({
  name: usernameRule.required(),
  email: emailRule.required(),
  password: passwordRule.required(),
  image: Joi.object().optional(),
  dob: Joi.string()
    .required()
    .custom((value, helpers) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return helpers.message("Date of birth must be a valid date");
      }
      const today = new Date();
      if (date > today) {
        return helpers.message("Date of birth cannot be in the future");
      }
      return value;
    }),
  department: departmentRule.required(),
  phoneno: phoneRule.required(),
  semester: Joi.string().required(),
  role: Joi.string().valid("student").required(),
});

const loginStudentSchema = Joi.object({
  email: emailRule.required(),
  password: Joi.string().required(),
  role: Joi.string().valid("student").required(),
});

const updateStudentSchema = Joi.object({
  role: Joi.string().valid("student").required(),
  name: usernameRule.required(),
  email: emailRule.required(),
  dob: Joi.string()
    .required()
    .custom((value, helpers) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return helpers.message("Date of birth must be a valid date");
      }
      const today = new Date();
      if (date > today) {
        return helpers.message("Date of birth cannot be in the future");
      }
      return value;
    }),
  department: departmentRule.required(),
  phoneno: phoneRule.required(),
  semester: Joi.string().required(),
});

// Teacher Schemas
const registerTeacherSchema = Joi.object({
  name: usernameRule.required(),
  email: emailRule.required(),
  password: passwordRule.required(),
  image: Joi.object().optional(),
  department: departmentRule.required(),
  phoneno: phoneRule.required(),
  role: Joi.string().valid("teacher").required(),
});

const loginTeacherSchema = Joi.object({
  email: emailRule.required(),
  password: Joi.string().required(),
  role: Joi.string().valid("teacher").required(),
});

const updateTeacherSchema = Joi.object({
  role: Joi.string().valid("teacher").required(),
  name: usernameRule.required(),
  email: emailRule.required(),
  department: departmentRule.required(),
  phoneno: phoneRule.required(),
});

module.exports = {
  registerStudentSchema,
  loginStudentSchema,
  updateStudentSchema,
  registerTeacherSchema,
  loginTeacherSchema,
  updateTeacherSchema,
};

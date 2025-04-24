const AppError = require("../utils/appError");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { stripUnknown: true });
  if (error) {
    const messages = error.details.map((detail) =>
      detail.message.replace(/["]/g, "")
    );
    return next(new AppError(messages.join(", "), 400));
  }
  req.body = value;
  next();
};

module.exports = validate;

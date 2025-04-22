const express = require("express");
const route = express.Router();
const bookController = require("../controller/bookController");
const validate = require("../middleware/validation.middleware.js");
const {
  registerBookSchema,
  updateBookSchema,
} = require("../validations/book.validation.js");

route.post(
  "/bookRegister",
  bookController.upload,
  validate(registerBookSchema),
  bookController.bookRegister
);
route.post(
  "/updateBooks/:id",
  validate(updateBookSchema),
  bookController.updateBook
);

route.post("/findBook", bookController.findBook);
route.post("/findOneBook/:id", bookController.findOneBook);
route.post("/deleteBook/:id", bookController.deleteBook);

module.exports = route;

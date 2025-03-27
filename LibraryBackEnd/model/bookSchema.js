const mongoose = require("mongoose");
const bookData = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  
});

module.exports = new mongoose.model("books", bookData);

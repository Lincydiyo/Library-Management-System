const mongoose = require("mongoose");
const teacherData = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },

});

module.exports = new mongoose.model("teachers", teacherData);

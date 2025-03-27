const mongoose = require("mongoose");
const studentData = new mongoose.Schema({
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
  dob: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    require: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("students", studentData);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["student", "teacher"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
  },
  department: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  // Student special input fields
  dob: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  semester: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
});

module.exports = mongoose.model("User", userSchema);

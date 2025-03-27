const mongoose = require("mongoose");
const teacherData = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: Object,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  phoneno: {
    type: Number,
    require: true,
  },

});

module.exports = new mongoose.model("teachers", teacherData);

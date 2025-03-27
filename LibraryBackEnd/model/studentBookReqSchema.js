const mongoose = require("mongoose");

const StudentBookRequest = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },

});

module.exports=mongoose.model("StudentBookRequest",StudentBookRequest)

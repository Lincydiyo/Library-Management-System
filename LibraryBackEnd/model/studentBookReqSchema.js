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
  returnDate: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("StudentBookRequest", StudentBookRequest);

const BookRequest = require("../model/teacherBookReqSchema");

const teacherReq = (req, res) => {
  const { teacherId, bookId } = req.body;
  if (!teacherId || !bookId) {
    return res.status(400).json({
      message: "Missing TeacherId Or BookId",
    });
  }

  //   Check if the Book already exists
  BookRequest.findOne({ teacherId, bookId })
    .then((existingRequest) => {
      if (existingRequest) {
        return res.status(400).json({
          message: "You Have Already Request This Book",
        });
      }

      // Create New Book Request

      const newRequsest = new BookRequest({
        teacherId,
        bookId,
      });
      newRequsest
        .save()
        .then(() => {
          return res.status(200).json({
            message: "Book Request Send To The Admin",
          });
        })
        .catch((error) => {
          return res.status(500).json({
           
            error,
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error checking for existing Books",
        error,
      });
    });
};

// Find All Teachers Requests

const findAllTeacherReq = (req, res) => {
  BookRequest.find({})
    .populate("teacherId bookId")
    .then((response) => {
      return res.status(200).json({
        RequestBook: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// Update the state (ie:Approved or Rejected) code
const teacherUpdateBookRequestStatus = (req, res) => {
  const { requestId, status } = req.body;

  if (!requestId || !status) {
    return res
      .status(400)
      .json({ message: "RequestId and Status are required" });
  }

  if (!["Approved", "Rejected"].includes(status)) {
    return res
      .status(400)
      .json({ message: "Invalid status. It must be 'Approved' or 'Rejected'" });
  }

  // Find the request by ID and update the status
  BookRequest.findByIdAndUpdate(requestId, { status }, { new: true })
    .then((updatedRequest) => {
      if (!updatedRequest) {
        return res.status(404).json({ message: "Book request not found" });
      }
      return res
        .status(200)
        .json({ message: `Book request ${status}`, updatedRequest });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};


module.exports = { teacherReq, findAllTeacherReq ,teacherUpdateBookRequestStatus};

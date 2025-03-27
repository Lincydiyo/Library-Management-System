const BookRequest = require("../model/studentBookReqSchema");

const studentReq = (req, res) => {
  const { studentId, bookId } = req.body;
  if (!studentId || !bookId) {
    return res.status(400).json({
      message: "Missing StudentId Or BookId",
    });
  }

  // Check if the Book already exists
  BookRequest.findOne({ studentId, bookId })
    .then((existingRequest) => {
      if (existingRequest) {
        return res.status(400).json({
          message: "You Have Already Request This Book",
        });
      }

      // Create New Book Request
      const newRequsest = new BookRequest({
        studentId,
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

// Find All Students Requests

const findAllStudentReq = (req, res) => {
  BookRequest.find({})
    .populate("studentId bookId")
    .then((response) => {
      // console.log("All Book Requests:", response);
      return res.status(200).json({
        RequestBook: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error fetching student book requests",
        error: error.message,
      });
    });
};

// Update the state (ie:Approved or Rejected) code
const studentUpdateBookRequestStatus = (req, res) => {
  const { requestId, status } = req.body; 

  if (!requestId || !status) {
    return res
      .status(400)
      .json({ message: "RequestId and Status are required" });
  }

  // Check if status is valid (Approve or Reject)
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

module.exports = { studentReq, findAllStudentReq, studentUpdateBookRequestStatus };

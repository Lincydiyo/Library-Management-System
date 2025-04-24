const { StudentBookRequest } = require("../model/index");

const {
  studentBookReqValidations,
} = require("../validations/studentReq.validation");

const studentReq = (req, res) => {
  const { studentId, bookId } = req.body;
  const { error } = studentBookReqValidations.validate({ studentId, bookId });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the Book already exists and is NOT returned
  StudentBookRequest.findOne({
    studentId,
    bookId,
    status: { $in: ["Pending", "Approved"] },
    returnDate: null,
  }).then((existingRequest) => {
    if (existingRequest) {
      return res.status(400).json({
        message: "You  have already requested  this book.",
      });
    }

    // Create New Book Request
    const newRequest = new StudentBookRequest({
      studentId,
      bookId,
      status: "Pending",
      requestDate: new Date(),
    });
    newRequest
      .save()
      .then((savedRequest) => {
        if (savedRequest) {
          return res.status(200).json({
            message: "Book request sent to the admin.",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Server error while requesting book",
          error: error.message,
        });
      });
  });
};

// Find All Students Requests

const findAllStudentReq = (req, res) => {
  StudentBookRequest.find({})
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
  StudentBookRequest.findByIdAndUpdate(requestId, { status }, { new: true })
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

// Find Particular person issued book
const findParticularStudentRequests = (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  StudentBookRequest.find({ studentId })
    .populate("studentId bookId")
    .then((response) => {
      const updatedRequests = response.map((req) => {
        if (req.status === "Approved" && !req.returnDate) {
          const today = new Date();
          const issueDate = new Date(req.requestDate);
          const diffDays = Math.ceil(
            (today - issueDate) / (1000 * 60 * 60 * 24)
          );
          req.fine = diffDays > 1 ? (diffDays - 1) * 10 : 0;
        }
        return req;
      });

      return res.status(200).json({ RequestBook: updatedRequests });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error fetching student's book requests",
        error: error.message,
      });
    });
};
// Return Book
const returnBook = (req, res) => {
  const { requestId } = req.body;

  if (!requestId) {
    return res.status(400).json({ message: "Request ID is required" });
  }

  StudentBookRequest.findById(requestId)
    .then((request) => {
      if (!request) {
        res.status(404).json({ message: "Book request not found" });
        return null;
      }

      if (request.returnDate) {
        res.status(400).json({ message: "Book already returned" });
        return null;
      }

      if (request.status !== "Approved") {
        res
          .status(400)
          .json({ message: "Only approved books can be returned" });
        return null;
      }

      const today = new Date();
      const issueDate = new Date(
        request.requestDate || request.createdAt || today
      );
      const diffDays = Math.ceil((today - issueDate) / (1000 * 60 * 60 * 24));
      const fine = diffDays > 1 ? (diffDays - 1) * 10 : 0;

      request.returnDate = today;
      request.fine = fine;

      return request.save();
    })
    .then((updatedRequest) => {
      if (!updatedRequest) return;
      res
        .status(200)
        .json({ message: "Book returned successfully", updatedRequest });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).json({ message: "Error returning book", error });
      }
    });
};

module.exports = {
  studentReq,
  findAllStudentReq,
  studentUpdateBookRequestStatus,
  returnBook,
  findParticularStudentRequests,
};

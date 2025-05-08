const { TeacherBookRequest } = require("../model/index");
const {
  teacherBookReqValidations,
} = require("../validations/teacherReq.validation");

const teacherReq = (req, res) => {
  const { teacherId, bookId } = req.body;
  const { error } = teacherBookReqValidations.validate({ teacherId, bookId });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the Book already exists and is NOT returned
  TeacherBookRequest.findOne({
    teacherId,
    bookId,
    status: { $in: ["Pending", "Approved"] },
    returnDate: null,
  }).then((existingRequest) => {
    if (existingRequest) {
      return res.status(400).json({
        message: "You  have already request  this book.",
      });
    }

    // Create New Book Request
    const newRequsest = new TeacherBookRequest({
      teacherId,
      bookId,
      status: "Pending",
      requestDate: new Date(),
    });
    newRequsest
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
// Find All Teachers Requests

const findAllTeacherReq = (req, res) => {
  TeacherBookRequest.find({})
    .populate("teacherId bookId")
    .then((response) => {
      return res.status(200).json({
        RequestBook: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: "Error fetching teacher book requests",
        error: error.message,
      });
    });
};

// Update the state (ie:Approved or Rejected) code
const teacherUpdateBookRequestStatus = (req, res) => {
  const { requestId, status } = req.body;

  // Validate input
  if (!requestId || !status) {
    return res
      .status(400)
      .json({ message: "RequestId and Status are required" });
  }

  // Check if status is valid (Approve or Reject)
  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. " });
  }

  TeacherBookRequest.findById(requestId)
    .then((request) => {
      if (!request) {
        return res.status(404).json({ message: "Book request not found" });
      }

      // Set status and formatted request date
      request.status = status;

      // Format today's date as dd-mm-yyyy
      const today = new Date();
      const formattedToday = formatDate(today);

      // Format request date
      const formattedRequestDate = formatDate(new Date(request.requestDate));

      request.requestDate = formattedRequestDate;
      // Only calculate fine if the request is Approved
      if (status === "Approved") {
        const issueDate = new Date(request.requestDate);
        const diffDays = Math.ceil((today - issueDate) / (1000 * 60 * 60 * 24));
        request.fine = diffDays > 1 ? (diffDays - 1) * 10 : 0;
      }

      return request.save();
    })

    .then((updatedRequest) => {
      return res.status(200).json({
        message: `Book request ${status} successfully`,
        updatedRequest,
      });
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error updating request", error: error.message });
    });
};
// Helper function to format date as dd-mm-yyyy
const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

// Find Particular person issued book

const findParticularTeacherRequests = (req, res) => {
  const { teacherId } = req.body;

  if (!teacherId) {
    return res.status(400).json({ message: "Teacher ID is required" });
  }

  TeacherBookRequest.find({ teacherId })
    .populate("teacherId bookId")
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
        message: "Error fetching teacher's book requests",
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

  TeacherBookRequest.findById(requestId)
    .then((request) => {
      if (!request) {
        return res.status(404).json({ message: "Book request not found" });
      }

      if (request.returnDate) {
        return res.status(400).json({ message: "Book already returned" });
      }

      if (request.status !== "Approved") {
        return res
          .status(400)
          .json({ message: "Only approved books can be returned" });
      }

      const today = new Date();
      const issueDate = new Date(
        request.requestDate || request.createdAt || today
      );
      const diffDays = Math.ceil((today - issueDate) / (1000 * 60 * 60 * 24));

      // If more than 1 day has passed since approval, calculate fine
      const fine = diffDays > 1 ? (diffDays - 1) * 10 : 0;

      request.returnDate = today;
      request.fine = fine;

      return request.save();
    })
    .then((updatedRequest) => {
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
  teacherReq,
  findAllTeacherReq,
  teacherUpdateBookRequestStatus,
  findParticularTeacherRequests,
  returnBook,
};

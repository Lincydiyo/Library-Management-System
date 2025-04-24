const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../middleware/auth.middleware");
// const { protect, restrictTo } = require("../middleware/auth.middleware");
const { User } = require("../model/index");
const multer = require("multer");

// Multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).single("image");

// Signup
const userSignUp = (req, res) => {
  const { role, name, email, password, dob, department, phoneno, semester } =
    req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Profile image is required" });
  }
  const data = new User({
    role,
    name,
    email,
    password,
    image: req.file,
    department,
    phoneno,
    dob: role === "student" ? dob : undefined,
    semester: role === "student" ? semester : undefined,
  });
  data
    .save()
    .then((user) => {
      const token = generateToken(user._id, user.role); 
      res.status(200).json({
        message: `${role} registered successfully`,
        data: {
          _id: user._id,
          name: user.name,
          image: user.image,
          token,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: `${role} registered failed`, error: err.message });
    });
};

// Login
const userLogin = (req, res) => {
  const { email, password, role } = req.body;

  User.findOne({ email, role })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Invalid email or role" });
      }

      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = generateToken(user._id, user.role);

      res.status(200).json({
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          image: user.image,
          token,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Login failed", error: err.message });
    });
};

// DeleteUser
const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        message: "User deleted successfully",
        deletedUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete user",
        error: error.message,
      });
    });
};

// UpdateUser
const updateUser = (req, res) => {
  const id = req.params.id;
  const { role, name, email, password, dob, department, phoneno, semester } =
    req.body;

  // First, find the user to preserve existing image if needed
  User.findById(id)
    .then((existingUser) => {
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedData = {
        role,
        name,
        email,
        password,
        image: req.file ? req.file : existingUser.image,
        department,
        phoneno,
        dob: role === "student" ? dob : undefined,
        semester: role === "student" ? semester : undefined,
      };

      // Then update
      User.findByIdAndUpdate(id, updatedData, { new: true })
        .then((updatedUser) => {
          res.status(200).json({
            message: `${role} Details Updated Successfully.`,
            update: updatedUser,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Error updating user",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error: error.message });
    });
};

// FindStudent
const findStudents = (req, res) => {
  User.find({ role: "student" })
    .then((students) => {
      res.status(200).json({ finddata: students });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch students", error });
    });
};

// FindTeacher
const findTeachers = (req, res) => {
  User.find({ role: "teacher" })
    .then((teachers) => {
      res.status(200).json({ finddata: teachers });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch students", error });
    });
};

// FindOneStudent
const findOneStudent = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id, role: "student" })
    .then((student) => {
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.status(200).json({ finddata: student });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error });
    });
};

// FindOneTeacher
const findOneTeacher = (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id, role: "teacher" })
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json({ finddata: teacher });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error", error });
    });
};

module.exports = {
  upload,
  userSignUp,
  userLogin,
  deleteUser,
  updateUser,
  findStudents,
  findTeachers,
  findOneStudent,
  findOneTeacher,
};

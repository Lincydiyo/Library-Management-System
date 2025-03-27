const teacherController = require("../model/teacherSchema");
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

// Teacher SignUp
const teacherSignUp = (req, res) => {
  const data = new teacherController({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.file,
    department: req.body.department,
    phoneno: req.body.phoneno,
  });
  data
    .save()
    .then((response) => {
      res.status(200).json({
        message: "Teacher Register successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Teacher Register failed",
      });
    });
};

// Teacher Login
const teacherLogin = (req, res) => {
  const { email, password } = req.body;
  teacherController
    .findOne({ email })
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({
          message: "Incorrect Email",
        });
      } else if (password !== teacher.password) {
        return res.status(404).json({
          message: "Incorrect Password",
        });
      } else {
        return res.status(200).json({
          message: "Login Successful 🎉",
          data: teacher,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// FindTeacher
const findTeacher = (req, res) => {
  teacherController
    .find({})
    .then((response) => {
      res.status(200).json({
        finddata: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

// DeleteTeacher
const deleteTeacher = (req, res) => {
  const id = req.params.id;
  const { name, email, password, image, department, phoneno } = req.body;
  teacherController
    .findByIdAndDelete(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
        image: image,
        department: department,
        phoneno: phoneno,
      },
      { new: true }
    )
    .then((response) => {
      res.status(200).json({
        delete: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

// FindOneTeacher
const findOneTeacher = (req, res) => {
  const id = req.params.id;
  teacherController
    .findOne({ _id: id })
    .then((response) => {
      res.status(200).json({
        finddata: response,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

// UpdateTeacher
const updateTeacher = (req, res) => {
  const id = req.params.id;
  const { name, email, password, image, department, phoneno } = req.body;
  teacherController
    .findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
        image: image,
        department: department,
        phoneno: phoneno,
      },
      { new: true }
    )
    .then((response) => {
      res.status(200).json({
        update: response,
        message: "Teacher Details Updated Successfully.",
      });
    })
    .catch((error) => {
      error;
    });
};


module.exports = {
  teacherSignUp,
  teacherLogin,
  findTeacher,
  deleteTeacher,
  findOneTeacher,
  updateTeacher,
  upload,
};

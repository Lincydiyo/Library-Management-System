const { TeacherController } = require("../model/index");
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
  const data = new TeacherController({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image: req.file,
    department: req.body.department,
    phoneno: req.body.phoneno,
  });
  data
    .save()
    .then(() => {
      res.status(200).json({
        message: "Teacher Register successfully",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Teacher Registration Failed" });
    });
};

// Teacher Login
const teacherLogin = (req, res) => {
  const { email, password } = req.body;
  TeacherController.findOne({ email })
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({
          message: " Email Id is Incorrect",
        });
      } else if (password !== teacher.password) {
        return res.status(404).json({
          message: " Password is Incorrect",
        });
      } else {
        return res.status(200).json({
          message: "Login Successful ",
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
  TeacherController.find({})
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
  TeacherController.findByIdAndDelete(
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
  TeacherController.findOne({ _id: id })
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
  TeacherController.findByIdAndUpdate(
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

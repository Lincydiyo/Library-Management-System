const studentController = require("../model/studentSchema");
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


// Student SignUp

const studentSignUp = (req, res) => {
  console.log(req.file);

  const data = new studentController({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    image:req.file,
    dob: req.body.dob,
    department: req.body.department,
    phoneno: req.body.phoneno,
    semester: req.body.semester,
  });
  data
    .save()
    .then((response) => {
      res.status(200).json({
        message: "Student Register successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Student Register failed",
      });
    });
};

// Student Login
const studentLogin = (req, res) => {
  const { email, password } = req.body;
  studentController
    .findOne({ email })
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          message: "Incorrect Email",
        });
      } else if (password !== student.password) {
        return res.status(404).json({
          message: "Incorrect Password",
        });
      } else {
        return res.status(200).json({
          message: "Login Successful 🎉",
          data: student,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// FindStudents
const findStudent = (req, res) => {
  studentController
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

// DeleteStudents
const deleteStudent = (req, res) => {
  const id = req.params.id;
  const { name, email, password,image, dob, department, phoneno, semester } =
    req.body;
  studentController
    .findByIdAndDelete(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
        image:image,
        dob: dob,
        department: department,
        phoneno: phoneno,
        semester: semester,
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

// FindOneStudent
const findOneStudent = (req, res) => {
  const id = req.params.id;
  studentController
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

// UpdateStudent
const updateStudent = (req, res) => {
  const id = req.params.id;
  const { name, email, password,image, dob, department, phoneno, semester } =
    req.body;
  studentController
    .findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
        image:image,
        dob: dob,
        department: department,
        phoneno: phoneno,
        semester: semester,
      },
      { new: true }
    )
    .then((response) => {
      res.status(200).json({
        update: response,
        message: "Student Details Updated Successfully.",
      });
    })
    .catch((error) => {
      error;
    });
};


module.exports = {
  studentSignUp,
  studentLogin,
  findStudent,
  deleteStudent,
  findOneStudent,
  updateStudent,
  upload
};

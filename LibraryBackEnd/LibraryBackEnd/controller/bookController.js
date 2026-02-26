const { BookController } = require("../model/index");
const multer = require("multer");
const { registerBookSchema } = require("../validations/book.validation");

// Multer
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Only allow image files not pdf or something
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, png, webp"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image"
);

// BookRegistration BackEnd Code
const bookRegister = (req, res) => {
  const { bookName, authorName, price, description, published } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Book image is required" });
  }
  // Joi validation
  const { error } = registerBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message).join(", "), 
    });
  }
  const data = new BookController({
    bookName,
    authorName,
    price,
    description,
    published,
    image: req.file,
  });
  data
    .save()
    .then(() => {
      res.status(200).json({
        message: "Book Register Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Book Registration Failed",
        error: err.message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        error: err.message,
      });
    });
};

// FindBook
const findBook = (req, res) => {
  BookController.find({})
    .then((response) => {
      return res.status(200).json({
        finddata: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// FindOneBook
const findOneBook = (req, res) => {
  const id = req.params.id;
  BookController.findOne({ _id: id })
    .then((response) => {
      return res.status(200).json({
        findbook: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// Delete Book
const deleteBook = (req, res) => {
  const id = req.params.id;
  
  BookController.findByIdAndDelete(id) 
    .then((response) => {
      if (response) {
        res.status(200).json({
          message: "Book Deleted Successfully",
        });
      } else {
        res.status(404).json({
          message: "Book not found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to delete the book.",
        error: error.message,
      });
    });
};

// Update Book
const updateBook = (req, res) => {
  const id = req.params.id;
  const { bookName, authorName, price, description, published, image } =
    req.body;
  BookController.findByIdAndUpdate(
    { _id: id },
    {
      bookName: bookName,
      authorName: authorName,
      price: price,
      description: description,
      published: published,
      image: image,
    },
    { new: true }
  )
    .then((response) => {
      res.status(200).json({
        update: response,
        message: "Book Details Updated Successfully.",
      });
    })
    .catch((error) => {
      error;
    });
};
module.exports = {
  bookRegister,
  findBook,
  deleteBook,
  upload,
  findOneBook,
  updateBook,
};

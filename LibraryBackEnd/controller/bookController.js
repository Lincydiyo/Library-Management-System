const {BookController} = require("../model/index");
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

// BookRegistration BackEnd Code
const bookRegister = (req, res) => {
  console.log(req.file);
  console.log(req.body);

  const data = new BookController({
    bookName: req.body.bookName,
    authorName: req.body.authorName,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published,
    image: req.file,
  });
  data
    .save()
    .then((response) => {
      res.status(200).json({
        Message: "Book Register Successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        Message: "Book Registration Failed",
      });
    });
};

// FindBook
const findBook = (req, res) => {
  BookController
    .find({})
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
  BookController
    .findOne({ _id: id })
    .then((response) => {
      return res.status(200).json({
        findbook: response,
        
      })
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
  const { bookName, authorName, price, description, published, image } =
    req.body;
  BookController
    .findByIdAndDelete(
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
      return res.status(200).json({
        delete: response,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// Update Book
const updateBook = (req, res) => {
  const id = req.params.id;
  const { bookName, authorName, price, description, published, image } =
    req.body;
    BookController
    .findByIdAndUpdate(
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
module.exports = { bookRegister, findBook, deleteBook, upload, findOneBook ,updateBook};

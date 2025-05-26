const express = require("express");
const cors = require("cors");
const parse = require("body-parser");
const dotenv = require("dotenv");
const dbconnection = require("./config/dbConnection");
const mainRoute = require("./router/index");
const errorMiddleware = require("./middleware/error.middleware");
const AppError=require("./utils/appError")

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://lincydiyo.github.io",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(parse.json());
app.use(express.static(`${__dirname}/upload`));
app.use("/", mainRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
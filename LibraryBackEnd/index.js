const express = require("express");
const app = express();
const dbconnection = require("./dbConnection");
const cors =require("cors")
app.use(cors())
const parse = require("body-parser");
const router = require("./router/route");

app.use(express.static(`${__dirname}/upload`));
app.use(parse.json());
app.use("/", router);

app.listen(5000, () => console.log("Your port is running on 5000"));

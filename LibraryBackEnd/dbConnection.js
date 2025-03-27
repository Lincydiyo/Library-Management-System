const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/library");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connection Successful😊"));



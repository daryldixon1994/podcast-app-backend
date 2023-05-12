const express = require("express");
const mongoose = require("mongoose");
const connect = require("./utils/connect");
require("dotenv").config();
const app = express();
const path = require("path");
const PORT = 5000 || process.env.PORT;
//connect to database
connect();

//express json middleware
app.use(express.json());

//multer middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/audios", express.static(path.join(__dirname, "audios")));

//user middleware
app.use("/api/user", require("./routes/user"));

//narrator middleware
app.use("/api/narrator", require("./routes/narrator"));

//admin middleware
app.use("/api/admin", require("./routes/admin"));

//server is listening
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is up and running...");
});

const express = require("express");
const mongoose = require("mongoose");
const connect = require("./utils/connect");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");
const PORT = 3000 || process.env.PORT;
//connect to database
connect();
// let corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//express json middleware
app.use(express.json());

//multer middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/audios", express.static(path.join(__dirname, "audios")));

//cors
// app.use((_req, res, next) => {
//   res.header({
//     "Access-Control-Allow-Origin": "https://podcast-app-fqku.onrender.com",
//   });
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "POST, PUT, PATCH, GET, DELETE, OPTIONS"
//   );

//   next();
// });
//user middleware
app.use("/api/user", require("./routes/user"));

//narrator middleware
app.use("/api/narrator", require("./routes/narrator"));

//admin middleware
app.use("/api/admin", require("./routes/admin"));

//server is listening
app.listen(PORT, (err) => {
  if (err) throw err;
});

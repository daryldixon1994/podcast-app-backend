const mongoose = require("mongoose");
require("dotenv").config();
const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;
const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://${USER}:${PASSWORD}@podcast.kgaybb2.mongodb.net/PODCASTAPP?retryWrites=true&w=majority`
    )
    .then(() => console.log("database is connected"))
    .catch((err) => console.log(err));
};
mongoose.set("strictQuery", true);
module.exports = connect;

const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    podcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
  },
  { timestamps: true }
);
module.exports = Review = mongoose.model("Review", reviewSchema);

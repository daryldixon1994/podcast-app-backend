const mongoose = require("mongoose");
//const Narrator = require("./Narrator")
const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    podcastImage: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    audioURL: {
      type: String,
      default: "/audioUploads",
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    episodeNumber: {
      type: Number,
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    narrator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Narrator",
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = Podcast = mongoose.model("Podcast", podcastSchema);

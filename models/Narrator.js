const mongoose = require("mongoose");
const narratorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    narratorName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    narratorImg: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isNarrator: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Narrator = mongoose.model("Narrator", narratorSchema);

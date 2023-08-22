const mongoose = require("mongoose");
//const Narrator = require("./Narrator")
const chunkSchema = new mongoose.Schema(
  {
    files_id: mongoose.Types.ObjectId,
    n: Number,
    data: {
      any: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);
module.exports = FsChunks = mongoose.model("Fs.chunks", chunkSchema);

const mongoose = require("mongoose");
//const Narrator = require("./Narrator")
const fileSchema = new mongoose.Schema({
  length: Number,
  chunkSize: Number,
  uploadDate: { type: Date, default: Date.now },
  filename: String,
  contentType: String,
  metadata: { any: mongoose.Schema.Types.Mixed },
});
module.exports = FsFiles = mongoose.model("Fs.files", fileSchema);

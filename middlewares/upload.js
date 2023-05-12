const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === "audio") {
      callback(null, "audios");
    } else if (file.fieldname === "photo") {
      callback(null, "uploads");
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, Date.now() + name);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "audio/ogg" ||
      file.mimetype == "audio/mp3" ||
      file.mimetype == "audio/wav"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

module.exports = upload;

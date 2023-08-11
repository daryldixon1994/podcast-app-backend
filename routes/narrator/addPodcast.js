const Podcast = require("../../models/Podcast");
// const cloudinary = require("../../middlewares/cloudinary");
const { getAudioDurationInSeconds } = require("get-audio-duration");
// const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    let { title, desc, category, tags, episodeNumber } = req.body;
    let { audio, photo } = req.files;
    // const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    const duration = await getAudioDurationInSeconds(audio[0].path);
    if (duration > 900) {
      return res.status(200).json({
        status: false,
        error: "Too large file",
      });
    }
    if (req.files.photo && req.files.audio) {
      // const { path } = req.file;
      // const { url } = await uploader(path);
      // fs.unlinkSync(path);
      const newPodcast = await new Podcast({
        title,
        desc,
        category,
        tags: tags.split(","),
        episodeNumber,
        audioURL: `https://podcast-app-fqku.onrender.com/audios/${audio[0].filename}`,
        narrator: id,
        podcastImage: `https://podcast-app-fqku.onrender.com/uploads/${photo[0].filename}`,
        duration,
      });
      const podcast = await newPodcast.save();
      return res.status(200).json({
        status: true,
        message: "you has been added successfully",
        data: podcast,
      });
    } else if (!req.files.photo && req.files.audio) {
      const newPodcast = await new Podcast({
        title,
        desc,
        category,
        episodeNumber,
        audioURL,
        narrator: id,
        podcastImage: "/uploads/addPhoto.jpg",
        duration,
      });
      const podcast = await newPodcast.save();
      return res.status(200).json({
        status: true,
        message: "you has been added successfully! no files",
        data: podcast,
      });
    }
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
};

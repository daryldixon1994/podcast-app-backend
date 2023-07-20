const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/narratorVerifyToken");
const upload = require("../../middlewares/upload");

//register : /api/narrator/register
router.post("/register", require("./register"));

//login : /api/narrator/login
router.post("/login", require("./login"));

//verify email : /api/narrator/verifyEmail
router.put("/verifyEmail", require("./verifyEmail"));

//get profile : /api/narrator/profile/:id
router.put("/profile/:id", require("./getProfile"));

//add podcast: /api/narrator/addPodcast
router.post(
  "/addPodcast",
  auth,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  require("./addPodcast")
);

//edit podcast : /api/narrator/editPodcast
router.put(
  "/editPodcast/:podcastId",
  auth,
  upload.single("photo"),
  require("./editPodcast")
);

//delete podcast : /api/narrator/deletePodcast/:podcastId
router.delete("/deletePodcast/:podcastId", auth, require("./deletePodcast"));

//get podcasts : /api/narrator/Podcasts
router.get("/Podcasts", auth, require("./getPodcasts"));

//get own podcasts : /api/narrator/myPodcasts
router.get("/myPodcasts", auth, require("./getOwnPodcasts"));

//get single podcast : /api/narrator/Podcast:id
router.get("/Podcast/:id", auth, require("./getPodcast"));

//get reviews: /api/narrator/reviews/:id
router.get("/reviews/:id", auth, require("./getReviews"));

module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/upload");
//register : /api/user/register
router.post("/register", require("./register"));

//login: /api/user/login
router.post("/login", require("./login"));

//verify email: /api/user/verifyEmail
router.put("/verifyEmail", require("./verifyEmail"));

//update profile pic : /api/user/updateProfilePhoto
router.put(
  "/updateProfilePhoto",
  auth,
  upload.single("photo"),
  require("./updateProfilePicture")
);

//get all podcasts : /api/user/Podcasts
router.get("/Podcasts", auth, require("./getPodcasts"));

//get single podcast: /api/user/Podcast/:id
router.get("/Podcast/:id", auth, require("./getPodcast"));

//add review: /api/user/addReview/:podcastId
router.post("/addReview/:podcastId", auth, require("./addReview"));

//update review: /api/user/updateReview/:reviewId
router.put("/updateReview/:reviewId", auth, require("./updateReview"));

//delete review: /api/user/deleteReview/:reviewId
router.delete("/deleteReview/:reviewId", auth, require("./deleteReview"));

//add like: /api/user/like/:id
router.post("/like/:podcastId", auth, require("./addLike"));

//get reviews: /api/user/reviews/:id
router.get("/reviews/:id", auth, require("./getReviews"));

module.exports = router;

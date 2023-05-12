const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/adminVerify");

//register : /api/admin/register
// router.post("/register", require("./register"));

// login : /api/admin/login
router.post("/login", require("./login"));

// ban user : /api/admin/banUser/:id
router.put("/banUser/:id", verify, require("./banUser"));

//ban narrator : /api/admin/banNarrator
router.put("/banNarrator/:id", verify, require("./banNarrator"));

// get users : /api/admin/users
router.get("/users", verify, require("./getUsers"));

//get narrators : /api/admin/narrators
router.get("/narrators", verify, require("./getNarrators"));

//get podcasts : /api/admin/podcasts
router.get("/podcasts", verify, require("./getPodcasts"));

//get single podcast: /api/user/Podcast/:id
router.get("/podcast/:id", verify, require("./getPodcast"));

//delete podcast: /api/user/deletePodcast/:podcastId
router.delete("/deletePodcast/:podcastId", verify, require("./deletePodcast"));

//delete review: /api/user/deletePodcast/:podcastId
router.delete("/deleteReview/:reviewId", verify, require("./deleteReview"));


module.exports = router;

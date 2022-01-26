const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");


router.post("/:id/reviews", reviewsCtrl.addReview);
module.exports = router;

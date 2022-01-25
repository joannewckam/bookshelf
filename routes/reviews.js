const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

router.post("/books/:id/reviews", reviewsCtrl.add);

module.exports = router;

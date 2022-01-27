const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

router.post("/books/:id/reviews", isLoggedIn, reviewsCtrl.addReview);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/auth/google");
}

module.exports = router;

var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res) {
	res.render("index", { user: req.user });
	// res.redirect("/");
});

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.get(
	"/oauth2callback",
	passport.authenticate("google", {
		successRedirect: "/users",
		failureRedirect: "/books",
	})
);
router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/books");
});

module.exports = router;

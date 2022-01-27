var express = require("express");
var router = express.Router();
const booksCtrl = require("../controllers/books");

/* GET users listing. */

router.get("/", booksCtrl.index);
router.get("/new", booksCtrl.new);
router.post("/", booksCtrl.create);
router.get("/:id", booksCtrl.show);
router.delete("/:id", isLoggedIn, booksCtrl.delete);

router.get("/update/:id", isLoggedIn, booksCtrl.updateForm);
router.put("/:id", isLoggedIn, booksCtrl.update);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/auth/google");
}

module.exports = router;

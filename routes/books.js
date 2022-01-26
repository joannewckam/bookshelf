var express = require("express");
var router = express.Router();
const booksCtrl = require("../controllers/books");
const reviewsCtrl = require("../controllers/reviews");

/* GET users listing. */
router.post("/:id/reviews", reviewsCtrl.addReview);

router.get("/", booksCtrl.index);
router.get("/new", booksCtrl.new);
router.post("/", booksCtrl.create);
router.get("/:id", booksCtrl.show);
router.delete("/:id", booksCtrl.delete);
router.get("/update/:id", booksCtrl.updateForm);
router.put("/:id", booksCtrl.update);

module.exports = router;

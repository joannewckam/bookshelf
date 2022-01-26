var express = require("express");
var router = express.Router();
const booksCtrl = require("../controllers/books");

/* GET users listing. */

router.get("/", booksCtrl.index);
router.get("/new", booksCtrl.new);
router.post("/", booksCtrl.create);
router.get("/:id", booksCtrl.show);
router.delete("/:id", booksCtrl.delete);

module.exports = router;

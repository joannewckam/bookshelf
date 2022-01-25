var express = require("express");
var router = express.Router();
const booksCtrl = require("../controllers/books");
const uploadCtrl = require("../controllers/upload");
/* GET users listing. */

router.get("/", booksCtrl.index);
router.get("/new", booksCtrl.new);
router.post("/", booksCtrl.create);
router.get("/:id", booksCtrl.show);

router.post("/new/upload", uploadCtrl.upload);
module.exports = router;

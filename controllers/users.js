const User = require("../models/user");
const Book = require("../models/book");

module.exports = {
	index,
};

function index(req, res) {
	Book.findOne({ title: "Harry Potter" })
		.where("rating")
		.gt(3)
		.then(function (title) {
			let book = title;
			console.log(book);
			res.render("users", { user: req.user, book });
		});
}

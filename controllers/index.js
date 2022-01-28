const Book = require("../models/book");

module.exports = {
	index,
};
function getUser(info) {
	if (info) return info;
	else return null;
}
function index(req, res) {
	Book.find({})
		.limit(5)
		.sort({ createdAt: -1 })
		.then(function (title) {
			let book = title;
			console.log(book);
			res.render("index", { user: getUser(req.user), book });
		});
}

const User = require("../models/user");
const Book = require("../models/book");
const res = require("express/lib/response");

module.exports = {
	index,
};
function getUser(info) {
	if (info) return info;
	else return null;
}
function index(req, res) {
	Book.findOne({})
		.where("rating")
		.gt(3)
		.then(function (title) {
			let book = title;
			console.log(book);
			res.render("users", { user: getUser(req.user), book });
		});
}

// function index(req, rest) {
// 	res.render('users', )
// }

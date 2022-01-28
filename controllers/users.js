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
			res.render("users", { user: getUser(req.user), book });
		});
}

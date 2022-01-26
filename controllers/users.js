const User = require("../models/user");

module.exports = {
	index,
};

function index(req, res) {
	res.render("users", { user: req.user });
	console.log(users);
}

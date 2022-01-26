let Book = require("../models/book");

module.exports = {
	addReview,
};
// console.log("in reviews controller");
function addReview(req, res) {
	console.log("I'm in addReview");
	Book.findById(req.params.id, function (err, book) {
		book.reviews.push(req.body);
		console.log("in addReview", req.body);
		book.save()
		res.redirect(`/books/${book._id}`);
	});
}

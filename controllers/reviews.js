let Book = require("../models/book");

module.exports = {
	addReview,
};
function addReview(req, res) {
	Book.findById(req.params.id, function (err, book) {
		book.reviews.push(req.body);
		book.save();
		res.redirect(`/books/${book._id}`);
	});
}

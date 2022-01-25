const Book = require("../models/book");

module.exports = {
	add: addReview,
};

function addReview(req, res) {
	Book.findById(req.params.id, function (err, book) {
		book.reviews.push(req.body);
		console.log(req.body);
		book.save(function (err) {
			res.redirect(`/books/${book.id}`);
		});
	});
}

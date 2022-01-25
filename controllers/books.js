const res = require("express/lib/response");
const Book = require("../models/book");

module.exports = {
	index,
	new: newBook,
	create,
	show,
};

function index(req, res) {
	Book.find({}, function (err, books) {
		res.render("books/index", { title: "All books", books });
	});
}

function newBook(req, res) {
	res.render("books/new", { title: "Add book" });
}

function create(req, res) {
	console.log(req.body.rating);
	const book = new Book(req.body);
	book.save(function (err) {
		if (err) console.log(err);
		console.log(book);
		res.redirect("/books");
	});
}
function show(req, res) {
	Book.findById(req.params.id)
		.populate("reviews")
		.exec(function (err, book) {
			console.log(book);
			res.render("books/show", { title: "Book Detail", book });
		});
}

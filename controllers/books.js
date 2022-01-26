const res = require("express/lib/response");
const Book = require("../models/book");
const request = require("request");
const endpoint = "https://api.imgur.com/3/image";
const fs = require("fs");
const book = require("../models/book");

module.exports = {
	index,
	new: newBook,
	create,
	show,
	delete: deleteBook,
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
	console.log("create request", req.body);
	let image = base64_encode(req.files.image.file);
	console.log("create image", image);
	const options = {
		method: "POST",
		url: endpoint,
		headers: {
			Authorization: `Client-ID ${process.env.CLIENT_ID}`,
		},
		formData: {
			type: "base64",
			image: image,
		},
	};
	request(options, function (err, response) {
		if (err) return console.log(err);
		let body = JSON.parse(response.body);
		let book = new Book({
			title: req.body.title,
			author: req.body.author,
			rating: req.body.rating,
			bookCover: body.data.link,
		});
		book.save(function (err) {
			if (err) console.log(err);
			console.log("in save book", book);
			res.redirect("/books");
		});
	});
}
function show(req, res) {
	Book.findById(req.params.id)
		.populate("reviews")
		.exec(function (err, book) {
			console.log("in show review", book.reviews);
			console.log("in show book function", book);
			res.render("books/show", { title: "Book Detail", book });
		});
}

function base64_encode(image) {
	let bitmap = fs.readFileSync(image);
	return bitmap.toString("base64");
}

function deleteBook(req, res) {
	Book.findById(req.params.id, function (err, book) {
		book.remove();
		book.save(function (err) {
			console.log("after remover", book);
			res.redirect("/books");
		});
	});
}

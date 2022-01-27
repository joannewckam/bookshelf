const res = require("express/lib/response");
const Book = require("../models/book");
const request = require("request");
const endpoint = "https://api.imgur.com/3/image";
const fs = require("fs");

module.exports = {
	index,
	new: newBook,
	create,
	show,
	delete: deleteBook,
	updateForm,
	update,
};
function getUser(info) {
	if (info) return info;
	else return null;
}
function index(req, res) {
	let user = getUser(req.user);
	Book.find({}, function (err, books) {
		res.render("books/index", { books, user });
	});
}
function newBook(req, res) {
	let user = getUser(req.user);
	res.render("books/new", { user });
}
function updateForm(req, res) {
	let user = getUser(req.user);
	res.render("books/updateForm", { book: req.params.id, user });
}
function update(req, res) {
	if (req.files.image) {
		let image = base64_encode(req.files.image.file);
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
				res.redirect("/books");
			});
		});
	} else {
		let book = new Book({
			title: req.body.title,
			author: req.body.author,
			rating: req.body.rating,
		});
		book.save(function (err) {
			if (err) console.log(err);
			console.log("in save book", book);
			res.redirect("/books");
		});
	}
}
function base64_encode(image) {
	let bitmap = fs.readFileSync(image);
	return bitmap.toString("base64");
}
function create(req, res) {
	if (req.files.image) {
		let image = base64_encode(req.files.image.file);
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
			if (err) return "error in request";
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
	} else {
		let book = new Book({
			title: req.body.title,
			author: req.body.author,
			rating: req.body.rating,
		});
		book.save(function (err) {
			if (err) console.log(err);
			console.log("in save book", book);
			res.redirect("/books");
		});
	}
}
function show(req, res) {
	let user = getUser(req.user);
	Book.findById(req.params.id)
		.populate("reviews")
		.exec(function (err, book) {
			res.render("books/show", { book, user });
		});
}

function deleteBook(req, res) {
	Book.findById(req.params.id, function (err, book) {
		book.remove();
		book.save(function (err) {
			res.redirect("/books");
		});
	});
}

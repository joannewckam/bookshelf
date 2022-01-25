const request = require("request");
const fs = require("fs");
const Book = require("../models/book");
const endpoint = "https://api.imgur.com/3/image";
module.exports = {
	upload,
};

function base64_encode(image) {
	let bitmap = fs.readFileSync(image);
	return bitmap.toString("base64");
}

function upload(req, res) {
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
		let image = body.data.link;
		// book.bookCover = image;
		res.render("books/new", { image });
	});
}

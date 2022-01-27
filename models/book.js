const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		review: String,
	},
	{
		timestamps: true,
	}
);
const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		bookCover: {
			type: String, //url for the image stores in imgur
		},
		rating: Number,
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Book", bookSchema);

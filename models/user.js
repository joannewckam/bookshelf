const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: String,
		email: String,
		avatar: String,
		book: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		googleId: String,
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("User", userSchema);

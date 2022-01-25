const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	email: String,
	avatar: String,
	books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
	googleId: String,
});
module.exports = mongoose.model("User", userSchema);

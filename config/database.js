const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
//database connection event
db.on("connected", function () {
	console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

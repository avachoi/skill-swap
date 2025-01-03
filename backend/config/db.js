const mongoose = require("mongoose");
// import dotenv from "dotenv";

const connectDB = async () => {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not defined in the environment variables");
	}
	try {
		await mongoose.connect(uri, { dbName: "skillSwap" });
		console.log("MongoDB Connected");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;

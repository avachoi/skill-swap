const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	skillsProficient: [String],
	skillsNeeded: [String],
	requests: [
		{
			from: String, // email of the user sending the request
			message: String,
		},
	],
});

module.exports = mongoose.model("User", userSchema);

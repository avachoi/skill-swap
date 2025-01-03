const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST /signup
router.post("/signup", async (req, res) => {
	const { name, email, skillsProficient, skillsNeeded } = req.body;
	try {
		const newUser = new User({ name, email, skillsProficient, skillsNeeded });
		await newUser.save();
		res.status(201).send("User registered successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
});

// GET /matches
router.get("/matches", async (req, res) => {
	const { email } = req.query;
	try {
		const user = await User.findOne({ email });
		const matches = await User.find({
			skillsProficient: { $in: user.skillsNeeded },
			_id: { $ne: user._id },
		});
		res.json(matches);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;

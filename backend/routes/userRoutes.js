const express = require("express");
const User = require("../models/User");
const router = express.Router();
const nodemailer = require("nodemailer");

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

// POST/ send emails
router.post("/send-request", async (req, res) => {
	const { toEmail, fromEmail, message } = req.body;

	try {
		const recipient = await User.findOne({ email: toEmail });
		const sender = await User.findOne({ email: fromEmail });

		if (!recipient || !sender) {
			return res.status(404).json({ message: "User not found." });
		}

		// Update recipient's requests
		recipient.requests.push({ from: fromEmail, message });
		await recipient.save();

		// Send email
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "skillswapio@gmail.com", // Your email
				pass: "lacm nqqv tfuq bapz", // Your email password
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: toEmail,
			subject: `New Collaboration Request from ${sender.name}`,
			text: `Hello ${recipient.name},\n\nYou have a new collaboration request from ${sender.name} (${fromEmail}).\n\nMessage: ${message}\n\nRegards,\nSkill Swap Team`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ message: "Request sent successfully." });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "An error occurred." });
	}
});
module.exports = router;

// const BASE_URL = "http://localhost:5000/api/users";

const signupForm = document.getElementById("signupForm");

console.log("js working");

signupForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	let userName = document.getElementById("name").value;
	let email = document.getElementById("email").value;

	let proficients = document.querySelectorAll(
		"input[name='Proficient']:checked"
	);

	let checkedProficients = [];
	proficients.forEach((prof) => {
		checkedProficients.push(prof.value);
	});

	let requireds = document.querySelectorAll("input[name='required']:checked");

	let checkedRequireds = [];
	requireds.forEach((req) => {
		checkedRequireds.push(req.value);
	});
	console.log(checkedProficients, checkedRequireds);

	let user = {
		name: userName,
		email: email,
		skillsProficient: checkedProficients,
		skillsNeeded: checkedRequireds,
	};
	try {
		const response = await fetch(`${BASE_URL}/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user),
		});
		if (response.ok) {
			alert("Signed up successfully!");
			window.location.href = `matches.html?email=${encodeURIComponent(email)}`;
		} else {
			const error = await response.json();
			alert(`Error: ${error.message}`);
		}
	} catch (err) {
		console.error("Error signing up:", err);
		alert("An error occurred. Please try again.");
	}
});

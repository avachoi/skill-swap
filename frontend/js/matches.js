const BASE_URL = "http://localhost:5000/api/users";

const params = new URLSearchParams(window.location.search);
const email = params.get("email");

if (email) {
	console.log("email", email);
	fetchMatches(email);
} else {
	alert("Sign up and connect.");
}

async function fetchMatches(email) {
	try {
		const response = await fetch(`${BASE_URL}/matches?email=${email}`);
		if (response.ok) {
			const matches = await response.json();
			console.log("matches", matches);
			displayMatches(matches);
		} else {
			const error = await response.json();
			alert(`Error: ${error.message}`);
		}
	} catch (err) {
		console.error("Error fetching matches:", err);
	}
}

function displayMatches(matches) {
	const matchesContainer = document.getElementById("match_box");
	matchesContainer.innerHTML = "";
	if (matches.length === 0) {
		matchesContainer.innerHTML = "<p>No matches found.</p>";
		return;
	}
	matches.forEach((match) => {
		const matchDiv = document.createElement("div");
		matchDiv.classList.add("match");
		matchDiv.innerHTML = `
          <p><strong>Name:</strong> ${match.name}</p>
          <p><strong>Email:</strong> ${match.email}</p>
          <p><strong>Skills:</strong> ${match.skillsProficient.join(", ")}</p>
          <button class="send-request-btn" data-email="${
						match.email
					}">Send Request</button>
    `;
		matchesContainer.appendChild(matchDiv);
	});
	// Add event listeners for buttons
	const buttons = document.querySelectorAll(".send-request-btn");
	buttons.forEach((button) =>
		button.addEventListener("click", (e) => {
			const toEmail = e.target.dataset.email;
			openRequestModal(toEmail);
		})
	);
}

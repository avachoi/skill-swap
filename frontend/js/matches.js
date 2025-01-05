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

let selectedEmail = "";

function openRequestModal(toEmail) {
	selectedEmail = toEmail;
	const modal = document.getElementById("requestModal");
	modal.style.display = "block";
}

document.getElementById("closeModalBtn").addEventListener("click", () => {
	const modal = document.getElementById("requestModal");
	modal.style.display = "none";
});

document
	.getElementById("sendRequestBtn")
	.addEventListener("click", async () => {
		const message = document.getElementById("requestMessage").value;

		if (!message.trim()) {
			alert("Please write a message.");
			return;
		}

		try {
			const response = await fetch(`${BASE_URL}/send-request`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					toEmail: selectedEmail,
					fromEmail: email,
					message,
				}),
			});

			if (response.ok) {
				alert("Request sent successfully.");
				document.getElementById("requestModal").style.display = "none";
			} else {
				const error = await response.json();
				alert(`Error: ${error.message}`);
			}
		} catch (err) {
			console.error("Error sending request:", err);
			alert("An error occurred. Please try again.");
		}
	});

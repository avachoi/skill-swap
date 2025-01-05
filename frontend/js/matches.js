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
	matches.forEach((match, idx) => {
		const matchDiv = document.createElement("div");
		matchDiv.classList.add("match");
		matchDiv.innerHTML = `
          <p><strong>Name:</strong> ${match.name}</p>
          <p><strong>Email:</strong> ${match.email}</p>
          <p><strong>Skills:</strong> ${match.skillsProficient.join(", ")}</p>
          <button class="send-request-btn target${idx}" data-email="${
			match.email
		}">Request Team-up</button>
        `;
		matchesContainer.appendChild(matchDiv);
	});

	// Add event listeners for buttons
	const buttons = document.querySelectorAll(".send-request-btn");
	buttons.forEach((button) =>
		button.addEventListener("click", (e) => {
			const toEmail = e.target.dataset.email;
			appendModal(toEmail, e.target.classList.value.split(" ")[1]);
		})
	);
}

function appendModal(toEmail, className) {
	const existedModal = document.querySelector(".modal");
	if (existedModal) {
		existedModal.remove();
	}

	const matchBox = document.querySelector(`.${className}`).parentElement;

	// Create modal container
	const modalDiv = document.createElement("div");
	modalDiv.classList.add("modal");
	modalDiv.innerHTML = `
        <div class="modal-content">
            <textarea id="requestMessage" placeholder="Write your message here"></textarea>
            <button id="sendRequestBtn">Send</button>
            <button id="closeModalBtn">Close</button>
        </div>
    `;
	matchBox.appendChild(modalDiv);

	// Add event listener for closing the modal
	const closeModalBtn = modalDiv.querySelector("#closeModalBtn");
	closeModalBtn.addEventListener("click", () => {
		matchBox.removeChild(modalDiv);
	});

	// Add event listener for sending the request
	const sendRequestBtn = modalDiv.querySelector("#sendRequestBtn");
	sendRequestBtn.addEventListener("click", async () => {
		const message = modalDiv.querySelector("#requestMessage").value;

		if (!message.trim()) {
			alert("Please write a message.");
			return;
		}

		try {
			const response = await fetch(`${BASE_URL}/send-request`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					toEmail: toEmail,
					fromEmail: email,
					message,
				}),
			});

			if (response.ok) {
				alert("Request sent successfully.");
				matchBox.removeChild(modalDiv); // Remove modal after sending request
			} else {
				const error = await response.json();
				alert(`Error: ${error.message}`);
			}
		} catch (err) {
			console.error("Error sending request:", err);
			alert("An error occurred. Please try again.");
		}
	});
}

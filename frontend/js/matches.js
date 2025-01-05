const BASE_URL = "http://localhost:5000/api/users";

const params = new URLSearchParams(window.location.search);
const email = params.get("email");

fetchMatches(email);

async function fetchMatches(email) {
    const response = [
        {
            _id: "677a01c9c6f222716b84e493",
            name: "b",
            email: "b@email.com",
            skillsProficient: ["JavaScript", "React"],
            skillsNeeded: ["HTML", "CSS"],
            requests: [
                {
                    from: "dd@email.com",
                    message: "hi b",
                    _id: "677a056317484f45a13adf81",
                },
            ],
            v: 1,
        },
        {
            _id: "677a02c6aca3d4d546040dad",
            name: "c",
            email: "c@mail.com",
            skillsProficient: ["HTML", "CSS", "JavaScript"],
            skillsNeeded: ["CSS", "JavaScript", "React"],
            requests: [],
            v: 0,
        },
        {
            _id: "677a0f437f221eba0b5dd769",
            name: "alex",
            email: "alexbchoi@gmail.com",
            skillsProficient: ["JavaScript", "React"],
            skillsNeeded: ["HTML", "CSS"],
            requests: [],
            __v: 0,
        },
    ];
    displayMatches(response);
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

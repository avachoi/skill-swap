# skill-swap

A web application designed to connect hackathon participants based on their skills and needs. The platform enables users to find teammates who complement their skill sets, fostering collaboration and networking opportunities.

## Features

- User Registration: Sign up with your name, email, skills you're proficient in, and skills you need.
- Matchmaking System: Automatically matches users based on their skills and requirements.
- User Dashboard: View your matches and connect with potential teammates.
- Responsive Design: Accessible on all devices with a user-friendly interface.

## Tech Stack

- Frontend: Vanilla JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB

## Setup and Installation

### Prerequisites

- Node.js installed on your system.
- MongoDB database (local or MongoDB Atlas).

### Steps

1. Clone the repository

```
git clone https://github.com/avachoi/skill-swap.git
cd skill-swap
```

2. Backend Setup

```
cd backend
npm install
```

- Create a .env file in the backend directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

- Start the backend server:

```
node server.js
```

3. Frontend Setup

Open frontend/index.html in your browser or serve it using a static file server (e.g., Live Server in VSCode).

## Contributors

- **[Ava Choi](https://github.com/avachoi)** - Project Lead, Backend Development
- **[Tulip Karmakar](https://github.com/tulipkr)** - Frontend Development, UI/UX Design

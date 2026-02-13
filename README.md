# Task Manager KL

A modern, full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). This application features a robust authentication system, a responsive glassmorphism UI, and efficient task organization tools.

## 🌐 Live Demo
Check out the live application here: **[Task Manager Live Demo](https://task-manager-omega-orcin.vercel.app)**

## 🚀 Features

*   **User Authentication**: Secure Sign Up and Login using JWT and Passport.js (Google Auth supported).
*   **Task Management**: Create, Read, Update, and Delete (CRUD) tasks.
*   **Smart Organization**:
    *   Categorize tasks (Work, Personal, Health, etc.).
    *   Set priorities (High, Medium, Low).
    *   Due date tracking.
*   **Interactive UI**:
    *   **Glassmorphism Design**: Modern, translucent aesthetic.
    *   **Dark/Light Mode**: Fully responsive theme toggling.
    *   **Dynamic Sorting**: Active tasks float to the top; completed tasks move to the bottom.
    *   **Collapsible Cards**: Click to expand task details for a cleaner view.
*   **Responsive**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
*   **React**: UI Library.
*   **Vite**: Build tool for fast development.
*   **Context API**: For global state management (Auth, Theme, Tasks).
*   **React Router**: For client-side routing.
*   **CSS Modules/Variables**: Custom styling with modern CSS features.

### Backend
*   **Node.js & Express**: Server-side runtime and framework.
*   **MongoDB & Mongoose**: NoSQL database and object modeling.
*   **Passport.js**: Authentication middleware.
*   **JWT**: Secure stateless authentication.

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
*   Node.js (v14+ recommended)
*   MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/mailech/Task-Manager-KL.git
cd Task-Manager-KL
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Optional for Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 📂 Project Structure

```
Task-Manager-KL/
├── backend/            # Express Server & DB Models
│   ├── config/         # Passport & DB Config
│   ├── controllers/    # Route Logic
│   ├── models/         # Mongoose Models (User, Task)
│   ├── routes/         # API Routes
│   └── server.js       # Entry Point
│
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable Components (Navbar, TaskItem, etc.)
    │   ├── context/    # Global State (AuthContext, TaskContext)
    │   ├── pages/      # main Pages (Home, Login, Register)
    │   └── utils/      # Helpers (API axios instance)
    └── index.css       # Global Styles & Theming
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is open-source and available under the MIT License.

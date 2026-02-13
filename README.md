# Task Manager Application

A full-stack Task Manager application built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React (Vite), Context API, Vanilla CSS (Glassmorphism Design)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Authentication:** JWT, Google OAuth Support
- **Styling:** Custom CSS with Dark Mode support

## Features

- User Registration & Login
- Google Authentication (requires configuration)
- Create, Read, Update, Delete (CRUD) Tasks
- Mark Tasks as Completed
- User-Specific Data Isolation
- Responsive & Premium UI Design

## Setup Instructions

1.  **Clone the repository** (if not already downloaded).
2.  **Install Dependencies:**
    ```bash
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    ```
    *(Note: Running `npm install` in the root should function if configured, but manual install in subfolders ensures stability)*

3.  **Environment Configuration:**
    - Create a `.env` file in the `backend` directory.
    - Add the following variables:
      ```env
      PORT=5000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      ```

4.  **Run the Application:**
    From the root directory, run:
    ```bash
    npm run dev
    ```
    This will start both the backend server (port 5000) and frontend client (port 5173) concurrently.

5.  **Access the App:**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## Submission Details

- **Author:** AI Assistant
- **Deadline:** 15/02/2026

## Notes

- The database connection string and Google Auth keys must be provided in the `.env` file.
- The UI is designed with a premium glassmorphism aesthetic.
- Dark mode is supported via system preferences.

# MERN E-commerce Project

This is a single-page e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application includes features such as product sorting, filtering, pagination, search functionality, Firebase email/password and Google login, and more.

## Project Structure

The project is divided into two main parts:
1. **Frontend**: A React application.
2. **Backend**: A Node.js and Express.js server connected to a MongoDB database.

---

## Frontend

### Features

- Product listing with sorting and filtering.
- Pagination for easy navigation through products.
- Search functionality to find products by name.
- User authentication with Firebase (email/password and Google login).

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/Nisha0202/store_jobtask_frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root of the frontend directory and add the following variables:
   ```env
    VITE_apiKey= your_firebase_api_key
    VITE_authDomain= our_firebase_auth_domain
    VITE_projectId= your_firebase_project_id
    VITE_storageBucket= your_firebase_storage_bucket
    VITE_messagingSenderId= your_firebase_messaging_sender_id
    VITE_appId= your_firebase_app_id
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. The application should now be running on `http://localhost:5173`.

### Important Notes

- Ensure the backend server is running and accessible at the URL specified in <your_backend_url>.
- Configure Firebase Authentication in your Firebase console for email/password and Google login methods.

## Acknowledgments

- Firebase for authentication.
- MongoDB for database management.
- React.js, Node.js, Express.js for the robust framework and libraries.

---

This README should help set up and run your project locally and provide a good foundation for others to understand the structure and purpose of the project.
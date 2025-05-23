# MERN File Upload App

A full-stack application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to upload files with name and description.

## Features

- Upload files with name and description
- View all uploaded files in a table format
- Delete entries
- Support for images (JPEG, PNG, GIF) and PDF documents
- Image preview functionality

## Setup Instructions

### Backend

1. Navigate to the backend directory
   `
   cd backend
   `

2. Install dependencies
   `
   npm install
   `

3. Create a .env file with the following variables:
   `
   MONGODB_URI=mongodb+srv://web:fishtank2.0@cluster0.8ysfyoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   `

4. Start the server
   `
   node server.js
   
   npm run dev
   `

### Frontend

1. Navigate to the frontend directory
   `
   cd frontend
   `

2. Install dependencies
   `
   npm install
   `

3. Start the React application
   `
   npm start
   `

## Technologies Used

- **MongoDB**: Database for storing file metadata
- **Express.js**: Backend web framework
- **React**: Frontend library
- **Node.js**: JavaScript runtime environment
- **Multer**: Middleware for handling file uploads
- **Axios**: HTTP client for API requests
- **React Router**: Navigation for the React application

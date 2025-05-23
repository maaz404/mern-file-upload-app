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
   `ash
   cd backend
   `

2. Install dependencies
   `ash
   npm install
   `

3. Create a .env file with the following variables:
   `
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   `

4. Start the server
   `ash
   node server.js
   # or
   npm run dev
   `

### Frontend

1. Navigate to the frontend directory
   `ash
   cd frontend
   `

2. Install dependencies
   `ash
   npm install
   `

3. Start the React application
   `ash
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

## Screenshots

![Upload Form](https://github.com/user-attachments/assets/0abe0f91-6db2-4e9e-bfab-cb1f482929e4)

![Data List](https://github.com/user-attachments/assets/b5c40e97-797c-48e2-afc3-9bc301852bf6)

Pharmacy Sales and Inventory Management System

A full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) to help pharmacies manage their inventory, sales, and dashboard reporting with ease and efficiency.

Project Objectives
The aim of this project is to provide small to mid-sized pharmacies with a simple, responsive, and secure web-based system for:
- Managing medicines inventory
- Tracking and recording sales
- Viewing real-time dashboard insights
- Securing access through authentication

Project Structure
/backend/        - Express.js + MongoDB (API, authentication, models , routes, controllers)
/frontend/       - React.js + Vite +  CSS (UI/UX)
README.md        - This documentation

Key Functionalities

Admin Features
- Admin Login – Secure login with JWT authentication
- Add Medicines – Add new medicines with price, quantity, and category
- Medicine List – View all available medicines in a responsive table
- Sales Dashboard – Real-time stats on medicine sales and total earnings

Technical Highlights
- MERN Stack based modular architecture
- Fast dev builds using Vite
- Responsive design using  CSS
- Protected routes with JWT
- Deployment on Render

Instructions for Running the Code

Backend Setup (/backend)
Requirements
- Node.js
- MongoDB (Local or MongoDB Atlas)

Dependencies
Backend: express, mongoose, jsonwebtoken, cors, dotenv
Frontend: react, vite, axios, react-router-dom

Setup Steps
cd backend
npm install

Environment Variables (.env)
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=jwt_secret
NODE_ENV = production

Run the Backend Server
npm start
The server will run at: http://localhost:3000

Frontend Setup (/frontend)
cd frontend
npm install


Run the Frontend App
npm run dev
Access the app at: http://localhost:5173

Live URLs
Frontend: https://pharmacy-frontend-ovl2.onrender.com/
Backend: https://project-backend-hosting-unxw.onrender.com/
Github: https://github.com/mr-umer20021473/Pharmacy-MERN





# Ikhtar App Backend

A backend application developed in Node.js and PostgreSQL that serves as the reporting system for child abuse. It provides an API for users to report incidents of child abuse, and administrators can manage and handle these reports.

## Features

- User registration and authentication
- Report creating using multiple methodes: Image, Video and Sound
- Administrator dashboard for handling and manage reports
- Role-based access control
- Data persistence using PostgreSQL database

## Technologies Used

- Node.js
- Express.js
- PostgreSQL

## Getting Started

To get started with the Ikhtar backend, follow these steps:

1. Clone the repository: `https://github.com/imadbourouche/Ikhtar_app_backend.git`
2. Install dependencies: `npm install`
3. Set up the PostgreSQL database and configure the connection details in `signalements.sql` and `admins.sql`
4. Start the server: `npm start`
5. The server will be running at `http://localhost:8888`

Make sure to also set up the frontend application for a complete working system. Refer to the README of the frontend repository here:

- [Admin_front_end](https://github.com/abirbourbia/user_side_asi).
- [User_fron_end](https://github.com/abirbourbia/user_side_asi).

## API Endpoints

The following API endpoints are available:

- `POST /login`: Login and obtain an authentication token
- `GET /signalements`: Get all reports
- `GET /signalementsById/:id`: Get reports by id
- `GET /signalementsByPhone/:phone`: Get reports by phone number
- `POST /uploadMedia`: Report with image
- `POST /uploadVocal`: Report with vocal
- `POST /uploadVideo`: Report with video
- `POST /updateStatus`: Update the status of report

Introduction
This project is a comprehensive user authentication and management system built using Node.js, Express, and MongoDB. It includes features such as user registration, login, logout, password management, token-based authentication, and image upload to Cloudinary.

Installation: 

Clone the repository:  git clone https://github.com/ricky08sirus/Backend_Project.git

Navigate to the project directory: cd Backend_Project

Install the dependencies: npm install

Set up environment variables by creating a .env file in the root directory:


MONGODB_URI=mongodb://localhost:27017/
DB_NAME=yourdbname
PORT=8000
CLOUDINARY_CLOUD_NAME=yourcloudname
CLOUDINARY_API_KEY=yourapikey
CLOUDINARY_API_SECRET=yourapisecret
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:3000


Start the server: npm start

The server will run on http://localhost:8000.

Features :

User Registration
User Login
User Logout
Password Management
Token-based Authentication (Access and Refresh Tokens)
Image Upload to Cloudinary
User Profile Management


Dependencies :

express: Fast, unopinionated, minimalist web framework for Node.js

mongoose: MongoDB object modeling tool designed to work in an asynchronous environment

jsonwebtoken: JSON Web Token implementation for token-based authentication

bcrypt: A library to help you hash passwords

multer: Middleware for handling multipart/form-data

cloudinary: Node.js SDK for uploading images and videos to Cloudinary

cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names




Configuration :

Ensure the environment variables are correctly set in the .env file. This includes database connection strings, API keys for Cloudinary, and secrets for JWT.

Documentation :

Routes : 


POST /api/v1/users/register
Registers a new user

POST /api/v1/users/login
Logs in an existing user

POST /api/v1/users/logout
Logs out the current user

POST /api/v1/users/refresh-token
Refreshes the access token

POST /api/v1/users/change-password
Changes the current user's password

GET /api/v1/users/current
Fetches the current user's details

PUT /api/v1/users/update
Updates the current user's account details




Troubleshooting :

Ensure MongoDB is running and accessible.

Verify all required environment variables are set.

Check for any errors in the server log for more details.



Contributors :

Amandeep Yadav

License :

This project is licensed under the MIT License. See the LICENSE file for details.
# 👤 User Management API

A robust, secure, and scalable RESTful API built with **Node.js** and **Express.js** for managing users. It features full CRUD operations, JWT-based authentication, password hashing, protected routes, and a clean modular architecture — ready for production use.

---

## 📋 Table of Contents

- [Description](#-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Example Requests](#-example-requests)
- [Error Handling](#-error-handling)
- [Future Improvements](#-future-improvements)

---

## 📖 Description

The **User Management API** is a backend service that provides a complete solution for user account management. It handles user registration, login, profile management, and secure deletion — all protected by JSON Web Tokens (JWT). Built following REST principles with a scalable, layered architecture, this API serves as a solid foundation for any application requiring user management capabilities.

---

## ✨ Features

- ✅ **User CRUD** — Create, Read, Update, and Delete user accounts
- ✅ **Authentication** — Secure Register & Login endpoints
- ✅ **Password Hashing** — Passwords are securely hashed using `bcryptjs`
- ✅ **JWT Token Generation** — Stateless authentication with signed tokens
- ✅ **Protected Routes** — Middleware-enforced access control
- ✅ **Validation Middleware** — Request payload validation before processing
- ✅ **Error Handling Middleware** — Centralized, consistent error responses
- ✅ **Structured Architecture** — Clean separation of concerns across routes, controllers, models, middleware, and config

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| Node.js          | Runtime environment              |
| Express.js       | Web framework                    |
| MongoDB          | NoSQL database                   |
| Mongoose         | MongoDB object modeling (ODM)    |
| JSON Web Token   | Stateless authentication         |
| bcryptjs         | Password hashing                 |
| dotenv           | Environment variable management  |

---

## 📁 Project Structure

```
user-api/
├── config/
│   └── db.js               # MongoDB connection setup
├── controllers/
│   ├── authController.js   # Register & Login logic
│   └── userController.js   # CRUD operations for users
├── middleware/
│   ├── authMiddleware.js   # JWT verification & route protection
│   ├── errorMiddleware.js  # Global error handler
│   └── validateMiddleware.js # Request validation
├── models/
│   └── User.js             # Mongoose User schema & model
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── userRoutes.js       # User resource routes
├── .env                    # Environment variables (not committed)
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
└── server.js               # Application entry point
```

---

## 🚀 Installation

Follow these steps to get the project running locally:

**1. Prerequisites**

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or [MongoDB Atlas](https://www.mongodb.com/atlas))

**2. Clone the repository**

```bash
git clone https://github.com/Khadir-Yassine/user-api.git
cd user-api
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

```bash
cp .env.example .env
```

Then open `.env` and fill in your values (see [Environment Variables](#-environment-variables) below).

---

## 🔑 Environment Variables

Create a `.env` file in the root directory based on the following template:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/user-management-api

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

| Variable         | Description                                    | Example                          |
|------------------|------------------------------------------------|----------------------------------|
| `PORT`           | Port the server listens on                     | `5000`                           |
| `NODE_ENV`       | Application environment                        | `development` / `production`     |
| `MONGO_URI`      | MongoDB connection string                      | `mongodb://localhost:27017/mydb` |
| `JWT_SECRET`     | Secret key used to sign JWT tokens             | A long, random, secure string    |
| `JWT_EXPIRES_IN` | Token expiration duration                      | `7d`, `1h`, `30m`                |

> ⚠️ **Never commit your `.env` file to version control.** Ensure `.env` is listed in your `.gitignore`.

---

## ▶️ Running the Project

**Development mode** (with auto-reload via `nodemon`):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start and connect to MongoDB. You should see output similar to:

```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000 in development mode
```

---

## 📡 API Endpoints

### 🔐 Auth Routes — `/api/auth`

| Method | Route                  | Description                        | Protected |
|--------|------------------------|------------------------------------|-----------|
| `POST` | `/api/auth/register`   | Register a new user account        | ❌ No     |
| `POST` | `/api/auth/login`      | Login and receive a JWT token      | ❌ No     |

### 👤 User Routes — `/api/users`

| Method   | Route               | Description                         | Protected |
|----------|---------------------|-------------------------------------|-----------|
| `GET`    | `/api/users`        | Retrieve all users                  | ✅ Yes    |
| `GET`    | `/api/users/:id`    | Retrieve a single user by ID        | ✅ Yes    |
| `PUT`    | `/api/users/:id`    | Update a user's profile information | ✅ Yes    |
| `DELETE` | `/api/users/:id`    | Delete a user account               | ✅ Yes    |

---

## 🔒 Authentication

This API uses **JWT Bearer Token** authentication. After a successful login, you receive a token that must be included in the `Authorization` header of every request to a protected route.

**Header format:**

```
Authorization: Bearer <your_jwt_token>
```

**Example using cURL:**

```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example using a REST client (e.g., Postman / Insomnia):**

1. Go to the **Authorization** tab.
2. Select **Bearer Token** as the type.
3. Paste your token into the **Token** field.

Tokens expire based on the `JWT_EXPIRES_IN` environment variable. Upon expiry, re-authenticate via `/api/auth/login` to receive a new token.

---

## 📝 Example Requests

### Register a New User

**`POST /api/auth/register`**

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response** `201 Created`:

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "createdAt": "2026-02-20T10:00:00.000Z"
  }
}
```

---

### Login

**`POST /api/auth/login`**

```json
{
  "email": "jane.doe@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response** `200 OK`:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
}
```

---

### Update a User

**`PUT /api/users/:id`** *(Protected)*

```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}
```

---

## ⚠️ Error Handling

All errors are handled by a centralized **error-handling middleware** and return a consistent JSON structure:

```json
{
  "success": false,
  "message": "A human-readable error description",
  "stack": "..." 
}
```

> The `stack` field is only included in `development` mode (`NODE_ENV=development`).

### Common HTTP Error Codes

| Status Code | Meaning                                                    |
|-------------|------------------------------------------------------------|
| `400`       | Bad Request — missing or invalid fields in the request body|
| `401`       | Unauthorized — missing or invalid JWT token                |
| `403`       | Forbidden — token valid but insufficient permissions       |
| `404`       | Not Found — the requested resource does not exist          |
| `409`       | Conflict — e.g., email already registered                  |
| `422`       | Unprocessable Entity — validation errors                   |
| `500`       | Internal Server Error — unexpected server-side error       |

---

## 🔮 Future Improvements

The following enhancements are planned for upcoming versions:

- [ ] **Role-Based Access Control (RBAC)** — Admin, moderator, and user roles with granular permissions
- [ ] **Email Verification** — Send a verification email upon registration via Nodemailer
- [ ] **Password Reset Flow** — Forgot password / reset password via secure email link
- [ ] **Refresh Tokens** — Implement a refresh token rotation strategy for improved session security
- [ ] **Rate Limiting** — Protect endpoints from brute-force attacks using `express-rate-limit`
- [ ] **Request Logging** — Structured request logging with `morgan` and `winston`
- [ ] **API Documentation** — Interactive API docs with Swagger / OpenAPI 3.0
- [ ] **Unit & Integration Tests** — Test coverage with Jest and Supertest
- [ ] **Pagination & Filtering** — Support pagination, sorting, and filtering on list endpoints
- [ ] **Docker Support** — Containerized deployment with `Dockerfile` and `docker-compose.yml`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Node.js & Express.js
</p>

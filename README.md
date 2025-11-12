# Exercise Tracker API

For my solution to the FreeCodeCamp Back End Development and APIs Exercise Tracker project I created a modern, RESTful API service for tracking exercises, built with Express.js and MongoDB. This project demonstrates clean architecture principles, modern JavaScript practices, and robust error handling.

The boilerplate code for this project which my solution is built on top of can be found here: [FCC exercise tracker project boilerplate](https://github.com/freeCodeCamp/boilerplate-project-exercisetracker/)

## Technologies & Architecture

### Core Technologies

-   **Node.js & Express.js** - Modern web application framework
-   **MongoDB & Mongoose** - Database with ODM for data validation and modeling
-   **ESM Modules** - Modern JavaScript module system

### 3-Tier Architecture

This project implements a proper 3-tier architecture with clear separation of concerns:

**Presentation Layer**
- `views/` - Frontend HTML interface
- `public/` - Static assets (CSS, client-side scripts)
- Route handlers in `index.js` manage HTTP requests and responses

**Business Logic Layer**
- `services/` - Core business logic and application workflows
- `utils/` - Middleware for validation and request processing
- Orchestrates data operations and enforces business rules

**Data Access Layer**
- `repositories/` - Data access patterns abstracting database operations
- `models/` - Mongoose schema definitions and data models
- `config/` - Database configuration and connection management

### Project Structure

```
├── views/         # Presentation Layer - HTML frontend
├── public/        # Presentation Layer - Static assets
├── index.js       # Presentation Layer - Route handlers & Request/Response management
├── services/      # Business Logic Layer - Core application logic
├── utils/         # Business Logic Layer - Validation middleware
├── repositories/  # Data Access Layer - Database operations
├── models/        # Data Access Layer - Schema definitions
└── config/        # Data Access Layer - Database setup
```

### Key Features

1. **Clean Architecture**

    - Repository pattern for database operations
    - Service layer for business logic orchestration
    - Clear separation of concerns across three tiers
    - Modular design with independent layers
    - Structured data flow: Request → Service → Repository → Model → Database

2. **Modern Development Practices**

    - ESM modules with updated import/export syntax
    - Async/await for clean asynchronous code
    - Lean queries for improved performance
    - CORS and security best practices

3. **Robust Validation & Error Handling**
    - Middleware-based request validation
    - Input sanitization and type checking
    - Structured error responses with propagation and layer-specific handling

## Test cases

1. ✅ You can `POST` to `/api/users` with form data `username` to create a new user.
2. ✅ The returned response from `POST /api/users` with form data `username` will be an object with `username` and `_id` properties.
3. ✅ You can make a `GET` request to `/api/users` to get a list of all users.
4. ✅ The `GET` request to `/api/users` returns an array.
5. ✅ Each element in the array returned from `GET /api/users` is an object literal containing a user's `username` and `_id`.
6. ✅ You can `POST` to `/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used.
7. ✅ The response returned from `POST /api/users/:_id/exercises` will be the user object with the exercise fields added.
8. ✅ You can make a `GET` request to `/api/users/:_id/logs` to retrieve a full exercise log of any user.
9. ✅ A request to a user's log `GET /api/users/:_id/logs` returns a user object with a count property representing the number of exercises that belong to that user.
10. ✅ A `GET` request to `/api/users/:_id/logs` will return the user object with a `log` array of all the exercises added.
11. ✅ Each item in the `log` array that is returned from `GET /api/users/:_id/logs` is an object that should have a `description`, `duration`, and `date` properties.
12. ✅ The `description` property of any object in the `log` array that is returned from GET /api/users/:\_id/logs should be a string.
13. ✅ The `duration` property of any object in the `log` array that is returned from `GET /api/users/:_id/logs` should be a number.
14. ✅ The `date` property of any object in the `log` array that is returned from `GET /api/users/:_id/logs` should be a string. Use the `dateString` format of the `Date` API.
15. ✅ You can add `from`, `to` and `limit` parameters to a `GET /api/users/:_id/logs` request to retrieve part of the log of any user. `from` and `to` are dates in `yyyy-mm-dd` format. `limit` is an integer of how many logs to send back.

## Usage

### Create a new user:

```
POST /api/users
Body: { "username": "john" }
Response: { "username": "john", "_id": "123abc"  }
```

### Log an exercise:

```
POST /api/users/123abc/exercises
Body: { "description": "Running", "duration": 30, "date": "2025-11-06" }
Response: { "_id": "123abc", "username": "john", "description": "Running", "duration": 30, "date": "Thu Nov 06 2025" }
```

### Getting a user's exercise log:

```
GET /api/users/123abc/logs?from=2025-01-01&to=2025-12-31&limit=5
Response: { "_id": "123abc", "username": "john", "count": 3, "log": [ {...}, {...}, {...} ] }
```
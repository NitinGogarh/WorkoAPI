```
# Worko API

Worko is building a product to help job seekers request referrals from multiple companies they are interested in. Users can also request services such as resume reviews, interview handholding, career guidance, and mock interviews.

## Project Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd worko-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Registration

#### `POST /register`

Registers a new user.

- **URL:** `/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "name": "Test User",
    "password": "testpassword"
  }
  ```

- **Success Response:**
  - **Code:** 201
  - **Content:** `User registered`

### User Login

#### `POST /login`

Logs in a user and returns a token.

- **URL:** `/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "testpassword"
  }
  ```

- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "token": "your_jwt_token" }`

### User CRUD Operations

All user CRUD operations require an authorization token obtained from the login endpoint.

#### `POST /worko/user`

Creates a new user.

- **URL:** `/worko/user`
- **Method:** `POST`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "age": 25,
    "city": "City",
    "zipCode": "12345"
  }
  ```

- **Success Response:**
  - **Code:** 201
  - **Content:** `Created user object`

#### `GET /worko/user`

Lists all users.

- **URL:** `/worko/user`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`

- **Success Response:**
  - **Code:** 200
  - **Content:** `Array of user objects`

#### `GET /worko/user/:userId`

Gets user details by ID.

- **URL:** `/worko/user/:userId`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`

- **Success Response:**
  - **Code:** 200
  - **Content:** `User object`

#### `PUT /worko/user/:userId`

Updates user details by ID.

- **URL:** `/worko/user/:userId`
- **Method:** `PUT`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Body:**
  ```json
  {
    "email": "updated@example.com",
    "name": "Updated User",
    "age": 26,
    "city": "Updated City",
    "zipCode": "54321"
  }
  ```

- **Success Response:**
  - **Code:** 200
  - **Content:** `Updated user object`

#### `PATCH /worko/user/:userId`

Partially updates user details by ID.

- **URL:** `/worko/user/:userId`
- **Method:** `PATCH`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`
- **Body:**
  ```json
  {
    "city": "Partially Updated City"
  }
  ```

- **Success Response:**
  - **Code:** 200
  - **Content:** `Partially updated user object`

#### `DELETE /worko/user/:userId`

Soft deletes the user by ID.

- **URL:** `/worko/user/:userId`
- **Method:** `DELETE`
- **Headers:**
  - `Authorization: Bearer your_jwt_token`

- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "isDeleted": true }`

## Running Tests

1. Ensure your MongoDB server is running.
2. Run the tests:
   ```bash
   npm test
   ```

The tests include registration, login, and CRUD operations for users.

## Folder Structure

```
.
├── controllers
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── models
│   └── userModel.js
├── routes
│   └── userRoutes.js
├── tests
│   └── user.test.js
├── app.js
├── package.json
└── .env
```

## Additional Features

- Improved error handling and validation using Joi.
- Soft delete functionality for user records.
- Basic authentication for all API endpoints.
- Unit tests with at least 60% coverage.

Feel free to contribute to this project by submitting a pull request or opening an issue.
```

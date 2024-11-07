# Task Manager API

A Node.js API for managing tasks with CRUD functionality. Users can register, log in, create tasks, mark them as completed or incomplete, filter tasks by status, and delete tasks. The API uses JWT for authentication and MongoDB as the database.

## Features

- **User Registration & Authentication**: Users can register and log in to receive a JWT token for accessing secure endpoints.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Task Status Filtering**: Retrieve tasks based on completion status (`completed` or `incomplete`).
- **Swagger API Documentation**: Interactive API documentation available at `/api-docs`.

## Prerequisites

- **Node.js**: v14 or higher
- **MongoDB**: You need a MongoDB URI; you can use MongoDB Atlas or a local MongoDB instance.
- **NPM**: Comes with Node.js, or you can use **Yarn** as an alternative.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Kerolos-George/Task_Manger_BackEnd.git
cd Task_Manger_BackEnd
```

### Install Dependencies

```bash
npm install
```

### Configuration

Create a `.env` file in the root of the project and set the following environment variables:

```plaintext
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

- **PORT**: The port on which the server will run (default: 3000).
- **MONGO_URI**: The URI of your MongoDB database.
- **JWT_SECRET**: Secret key for signing JWT tokens. Replace with a strong secret.

### Run the Application

To start the server in development mode with auto-reload:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server should now be running on `http://localhost:3000`.

## API Documentation

Swagger documentation is available at `http://localhost:3000/api-docs`.

### Authentication

All task-related endpoints require a JWT token. After logging in, include the token in the `Authorization` header for authenticated requests:

```
Authorization: Bearer <your_token>
```

### Endpoints

#### User Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

#### Task Management

- **Create Task**: `POST /api/tasks` - Create a new task.
- **Get All Tasks**: `GET /api/tasks` - Retrieve all tasks for the logged-in user. Supports filtering by `status`.
- **Get Task by ID**: `GET /api/tasks/:id` - Retrieve a specific task by its ID.
- **Update Task**: `PUT /api/tasks/:id` - Update a specific task.
- **Delete Task**: `DELETE /api/tasks/:id` - Delete a specific task.



## Project Structure

```
TaskManager/
├── src/
│   ├── controllers/       # Handles business logic (e.g., TaskController, UserController)
│   ├── models/            # Mongoose schemas for Task, User
│   ├── routes/            # API route files (taskRoutes, authRoutes)
│   ├── services/          # Service layer for data processing and DB operations
│   ├── middlewares/       # Middleware functions (authMiddleware, validation)
│   └── app.js             # Initialize Express, middlewares, routes
├── config/                # Config files (database, Swagger setup)
├── README.md              # Project documentation
├── .env                   # Environment variables (database URI, JWT secret)
```

## Testing with Swagger

The Task Manager API includes built-in interactive documentation using Swagger, which allows you to test the API endpoints directly from your browser.

### Accessing Swagger UI

1. **Start the Server**: Make sure the server is running by executing:
   ```bash
   npm run dev
   ```
   The server should start on `http://localhost:3000` (or the port specified in your `.env` file).

2. **Open Swagger UI**: In your browser, go to:
   ```
   http://localhost:3000/api-docs
   ```

   This will open the interactive Swagger UI, where you can see all available endpoints, including user authentication and task management.

### Authorizing with JWT

To test endpoints that require authorization (like creating, updating, or deleting tasks), you need to provide a JWT token in Swagger UI:

1. **Register or Login**:
   - First, use the `POST /api/auth/register` or `POST /api/auth/login` endpoints in Swagger to create a user or log in.
   - Upon successful login, you’ll receive a JWT token in the response.

2. **Authorize in Swagger**:
   - At the top right of the Swagger UI, click the **Authorize** button.
   - In the dialog that appears, enter your token in the following format:
     ```
     Bearer YOUR_JWT_TOKEN
     ```
   - Click **Authorize** and close the dialog. This will apply the token to all secure endpoints.


# Wellness Platform

A full-stack web application for creating and managing wellness sessions. Users can create, save as drafts, publish, and share wellness sessions with others.

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd wellness-plateform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/wellness-platform
JWT_SECRET=your-super-secret-jwt-key-here
```

**Note**: Replace `your-super-secret-jwt-key-here` with a strong secret key for JWT token generation.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start the Application

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "result": {
    "_id": "user_id",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### Login User

```http
POST /login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "result": {
    "_id": "user_id",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

### Session Endpoints

#### Get Public Sessions (No Auth Required)

```http
GET /sessions
```

**Response:**

```json
[
  {
    "_id": "session_id",
    "title": "Morning Yoga Session",
    "tags": ["yoga", "morning", "meditation"],
    "jsonFileUrl": "https://example.com/session.json",
    "status": "published",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get User's Sessions (Auth Required)

```http
GET /my-sessions
Authorization: Bearer <jwt_token>
```

**Response:**

```json
[
  {
    "_id": "session_id",
    "userId": "user_id",
    "title": "My Wellness Session",
    "tags": ["wellness", "health"],
    "jsonFileUrl": "https://example.com/session.json",
    "status": "draft",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Get Single Session (Auth Required)

```http
GET /my-sessions/:id
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "_id": "session_id",
  "userId": "user_id",
  "title": "My Wellness Session",
  "tags": ["wellness", "health"],
  "jsonFileUrl": "https://example.com/session.json",
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Save Draft Session (Auth Required)

```http
POST /my-sessions/save-draft
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "_id": "session_id", // Optional - include to update existing session
  "title": "My Wellness Session",
  "tags": "wellness, health, meditation",
  "jsonFileUrl": "https://example.com/session.json"
}
```

**Response:**

```json
{
  "_id": "session_id",
  "userId": "user_id",
  "title": "My Wellness Session",
  "tags": ["wellness", "health", "meditation"],
  "jsonFileUrl": "https://example.com/session.json",
  "status": "draft",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Publish Session (Auth Required)

```http
POST /my-sessions/publish/:id
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Session published successfully!",
  "session": {
    "_id": "session_id",
    "userId": "user_id",
    "title": "My Wellness Session",
    "tags": ["wellness", "health"],
    "jsonFileUrl": "https://example.com/session.json",
    "status": "published",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Delete Session (Auth Required)

```http
DELETE /my-sessions/:id
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Session deleted successfully!"
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer <jwt_token>
```

Tokens are valid for 1 hour and are automatically included in requests from the frontend.

## 📁 Project Structure

```
wellness-plateform/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   └── wellnessSessionController.js
│   │   ├── middleware/
│   │   │   └── jwtAuth.js
│   │   ├── models/
│   │   │   ├── UserModel.js
│   │   │   └── WellnessSessionModel.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   └── wellnessSessionRoutes.js
│   │   └── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SessionForm.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MySessionsPage.jsx
│   │   │   └── SessionEditorPage.jsx
│   │   ├── utils/
│   │   │   └── debounce.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

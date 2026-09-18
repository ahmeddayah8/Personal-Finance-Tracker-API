# 💰 Personal Finance Tracker API

A fully functional RESTful API for managing personal finances. Users can track their income and expenses, organize transactions into categories, view monthly financial summaries, upload profile pictures, and securely access their data using JWT authentication.

## 🚀 Features

### 🔐 Authentication & Authorization

- User registration
- User login
- JWT authentication
- Password hashing with bcrypt
- Protected routes
- User profile
- Role-based authorization
- `user` and `admin` roles

### 💳 Transactions

- Create income and expense transactions
- Get all user's transactions
- Get a single transaction
- Update transactions
- Delete transactions
- Filter transactions by month
- Monthly income and expense summary
- Spending summary by category

### 📊 Monthly Summary

The API provides:

- Total income
- Total expenses
- Current balance
- Spending by category
- Monthly financial overview

### 🖼️ Profile Picture Upload

- Upload profile pictures
- Multer `memoryStorage()`
- Cloudinary image hosting
- JPG, PNG and WEBP support
- Maximum file size: 5 MB

### 🛡️ Security & Middleware

- JWT authentication
- bcrypt password hashing
- Zod request validation
- CORS
- Helmet
- Express Rate Limiting
- Request logger
- 404 handler
- Global error handler

### 📚 API Documentation

Interactive Swagger documentation is available at:

```text
http://localhost:5000/docs
```

Swagger includes:

- Auth endpoints
- Transaction endpoints
- Upload endpoint
- Admin endpoints
- Bearer JWT authentication

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Zod
- Multer
- Cloudinary
- Swagger UI
- swagger-jsdoc
- Helmet
- CORS
- express-rate-limit
- Nodemon

---

## 📁 Project Structure

```text
finance-tracker-api/
│
├── controllers/
│   ├── authControllers.js
│   ├── transactionControllers.js
│   └── uploadControllers.js
│
├── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── upload.js
│   └── validate.js
│
├── models/
│   ├── Transaction.js
│   └── User.js
│
├── routes/
│   ├── auth.js
│   ├── transactions.js
│   └── upload.js
│
├── schema
│   ├── authValidation.js
│   └── transactionSchema.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/ahmeddayah8/Personal-Finance-Tracker-API.git
```

## 2. Navigate to the project

```bash
cd finance-tracker-api
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env`

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/finance_tracker

JWT_SECRET=your_super_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> Never commit your `.env` file to GitHub.

---

# ▶️ Run the Project

### Development

```bash
npm start
```

The server will run on:

```text
http://localhost:5000
```

API documentation:

```text
http://localhost:5000/docs
```

---

# 🔑 Authentication

The API uses JWT Bearer Authentication.

After login, copy the returned token and use it in protected requests:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

In Swagger:

1. Open `/docs`
2. Click **Authorize 🔒**
3. Enter your JWT token
4. Click **Authorize**

---

# 📌 API Endpoints

## 🔐 Auth

| Method | Endpoint         | Description   | Auth |
| ------ | ---------------- | ------------- | ---- |
| POST   | `/auth/register` | Register user | ❌   |
| POST   | `/auth/login`    | Login user    | ❌   |
| GET    | `/auth/profile`  | Get profile   | ✅   |

### Register

```http
POST /auth/register
```

Request:

```json
{
  "name": "Ahmed",
  "email": "ahmed@gmail.com",
  "password": "123456"
}
```

### Login

```http
POST /auth/login
```

Request:

```json
{
  "email": "ahmed@gmail.com",
  "password": "123456"
}
```

---

# 💳 Transactions

| Method | Endpoint                        | Description             | Auth |
| ------ | ------------------------------- | ----------------------- | ---- |
| POST   | `/transactions`                 | Create transaction      | ✅   |
| GET    | `/transactions`                 | Get user's transactions | ✅   |
| GET    | `/transactions/monthly-summary` | Monthly summary         | ✅   |
| GET    | `/transactions/:id`             | Get transaction         | ✅   |
| PUT    | `/transactions/:id`             | Update transaction      | ✅   |
| DELETE | `/transactions/:id`             | Delete transaction      | ✅   |

### Create Transaction

```http
POST /transactions
```

Request:

```json
{
  "title": "Groceries",
  "amount": 50,
  "type": "expense",
  "category": "Food",
  "date": "2026-09-18"
}
```

Supported transaction types:

```text
income
expense
```

---

# 📊 Monthly Summary

```http
GET /transactions/monthly-summary?month=2026-09
```

Example response:

```json
{
  "month": "2026-09",
  "totalIncome": 500,
  "totalExpenses": 100,
  "balance": 400,
  "categories": [
    {
      "_id": "Food",
      "total": 70
    },
    {
      "_id": "Transport",
      "total": 30
    }
  ]
}
```

---

# 🖼️ Profile Picture

```http
POST /upload/profile-picture
```

### Authorization

```text
Bearer YOUR_JWT_TOKEN
```

### Body

Use `multipart/form-data`:

```text
profilePicture: [image file]
```

Supported formats:

```text
JPG
PNG
WEBP
```

Maximum file size:

```text
5 MB
```

Images are uploaded to Cloudinary and the resulting URL is saved to the user's profile.

---

# 🛡️ Validation

The API uses Zod to validate incoming requests.

Example validation rules:

### User

- Name must contain at least 2 characters
- Email must be valid
- Password must contain at least 6 characters

### Transaction

- Title must contain at least 2 characters
- Amount must be greater than 0
- Type must be `income` or `expense`
- Category is required

Invalid requests return:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

---

# 🔒 Security

The API includes several security layers:

```text
JWT Authentication
        ↓
bcrypt Password Hashing
        ↓
Zod Validation
        ↓
Helmet
        ↓
CORS
        ↓
Rate Limiting
        ↓
Protected Routes
        ↓
Role-Based Authorization
```

Users can only access their own transactions.

Admin endpoints are protected using role-based authorization.

---

### Global Error Handler

Handles unexpected server errors and returns a consistent JSON response.

---

# 📋 Logger

The API logs HTTP requests including:

- HTTP method
- URL
- Status code
- Response time

Example:

```text
GET /transactions 200 - 12ms
POST /auth/login 200 - 45ms
GET /unknown 404 - 3ms
```

---

# 🧪 Testing

The API can be tested using:

- Postman
- Swagger UI
- MongoDB / MongoDB Compass

Recommended testing order:

```text
1. Register
2. Login
3. Copy JWT token
4. Get Profile
5. Create Transaction
6. Get Transactions
7. Update Transaction
8. Delete Transaction
9. Monthly Summary
10. Upload Profile Picture
11. Test Admin Overview
```

---

# 📚 Swagger Documentation

Open:

```text
http://localhost:5000/docs
```

Swagger groups endpoints into:

```text
Auth
Transactions
Upload
Admin
```

Protected endpoints use:

```text
bearerAuth
```

---

# 🌱 Future Improvements

Possible future features:

- Custom transaction categories
- Transaction search
- Date-range filtering
- Pagination
- Budget management
- Recurring transactions
- Export transactions to CSV/PDF
- Email notifications
- Password reset
- Refresh tokens
- Frontend dashboard
- Financial charts and analytics

---

# 👨‍💻 Author

**Ahmed_Abdisalam**

Built as a backend capstone project to practice:

```text
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Zod
Cloudinary
Swagger
REST API Development
```

---

# ⭐ Project Goal

The goal of this project is to build a secure, scalable, and well-documented REST API for personal finance management while demonstrating practical backend development skills.

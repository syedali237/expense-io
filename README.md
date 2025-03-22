# Mini Expense Tracker

## Overview

A web application that allows users to track and manage their expenses with category-wise insights.

### Key Features
- Add, modify, delete, and view expenses
- Category-wise spending insights with bar charts
- Secure login and user authentication using JWT
- Search expenses by category, amount, or date

### Technologies Used
- **Frontend:** Vite + ReactJS, TailwindCSS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)

## Development Approach

### Frontend
1. Initial design drafted in Canva: [View Design](https://www.canva.com/design/DAGdsUrrTlc/y6HD9gfJruQoGlM3FcxsHA/edit?utm_content=DAGdsUrrTlc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
2. Implemented using React + TypeScript and TailwindCSS 4
3. Directory structure:
   ```
   src/
   ├── assets/
   ├── components/
   ├── screens/
   ├── App.tsx
   └── main.tsx
   ```
4. API communication is made using **Axios**
5. Navigation between screens is done using **React Router Dom**
6. Data visualization (Bar Charts) implemented using **Chart.js** and **react-chartjs**

### Backend
1. Built with **Node.js, Express, and MongoDB (with Mongoose)**
2. Directory structure:
   ```
   backend/
   ├── config/
   ├── controllers/
   ├── middleware/
   ├── models/
   ├── routes/
   └── index.ts
   ```
3. Established database schema and relationships between models
4. Implemented authentication with secure password handling
5. Implemented CRUD operations for expense management
6. Created endpoints for category-wise expense calculations
7. Created endpoints for all the operations

## Authentication Implementation

### JWT Workflow
1. **Registration:** 
   - User provides firstname, lastname, email and password
   - Password is hashed using **bcryptjs** with salt rounds for security
   - User record created in database with hashed password
2. **Login:**
   - Email and Password are verified against the DB record
   - If valid, a JWT access token and refresh token are issued
3. **Storage:** 
   - JWT access token is stored in both: Secure HTTP-only cookies for security and in localstorage (for easy application state management)
   - Refresh Token stored only in HTTP-only cookie
4. **Verification:** 
   - Protected routes require token in `Authorization` header as `Bearer <token>`
   - User information extracted from token payload
5. **Expiration:** 
   - Access tokens expire after 2 hours for security
   - Refresh token valid for 7 days
   - Automatic refresh mechanism implemented when access token expires
6. **Logout:** JWT cookie is cleared to end the session

## Expense Management Features

### Adding an Expense
Users can add expenses with the following details:
- Expense name
- Amount
- Category
- Date
- Description

The process flow:

1. User clicks the "+" button on the dashboard
2. A modal appears with input fields, User provides details and submits
3. Frontend validates all inputs and data sent to backend via `POST request`.
4. Backend validates data and creates expense record
5. Dashboard updates to show new expense

### Managing Expenses
- **Update:** 
   - Edit existing expense details
   - `PUT request` sent to update the database record
- **Delete:** 
   - Remove expenses from the system
   - `DELETE request` made to delete the expense from the database
- **View:** 
   - Retrieve and display all user expenses
   - a `GET request` made to fetch all the expenses

### Spending Insights
An endpoint aggregates expenses by category and provides:
- Total spending per category
- Percentage breakdown of spending
- Overall total expenditure

**Endpoint:** `GET /api/expense/insights`

**Example Response:**
```json
{
  "categoryPercentages": [
    {
      "category": "Food",
      "totalSpent": 200,
      "percentage": 20
    },
    {
      "category": "Travel",
      "totalSpent": 800,
      "percentage": 80
    }
  ],
  "totalSpent": 1000
}
```

## Preview 

https://github.com/user-attachments/assets/b67f6612-a792-415d-9095-dcf31c09fd48

*Collections inside the DB:*

<img width="1121" alt="Screenshot 2025-03-23 at 4 27 20 AM" src="https://github.com/user-attachments/assets/3b360760-8985-4615-8cde-0350e9c83e48" />



## Local Setup Instructions

### Prerequisites
- Git
- Node.js and npm

### Installation Steps
1. Clone the repository:
   ```
   git clone https://github.com/syedali237/expense-io
   cd expense-io
   ```

2. Create a `.env` file in the backend directory with:
   ```
   MONGO_URI=YOUR_DATABASE_URI
   JWT_SECRET=YOUR_JWT_SECRET
   ```

3. Install dependencies and start servers:

   | Command | Location | Action |
   |---------|----------|--------|
   | `npm install` | Frontend & Backend | Install dependencies |
   | `npm run dev` | Frontend | Start dev server at `localhost:5173` |
   | `npm start` | Backend | Start server at `localhost:8000` |

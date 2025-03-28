# Global Assignment

## 🚀 Project Overview
This project is a user authentication and management system built with React, Redux Toolkit,React Router. It allows users to log in, manage their profiles, and interact with a user list.

## 🛠️ Technologies Used
- **Frontend:** React, Redux Toolkit, Vite, CSS
- **State Management:** Redux Toolkit
- **Navigation:** React Router DOM
- **Notification:** Notiostack (SnackBar)

## 📂 Project Structure
```
Global_assignment/
│── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Login, Dashboard, etc.)
│   ├── reducers/          # Redux slices for state management
│   ├── assets/            # Static assets like images
│   ├── App.js             # Main App component
│── public/
│── index.html
│── index-Ce-Y3XlF.js      # Main JavaScript file
│── index-rrYCE2lv.css     # Main CSS file
│── vite.config.js         # Vite configuration
│── package.json           # Project dependencies
│── README.md              # Project documentation
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/11shazam11/Global_assignment.git
cd Global_assignment
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Run the Project
```sh
npm run dev
```
The application will be available at `http://localhost:5173/` (default Vite port).

## 🔑 Authentication Flow
1. User enters credentials and submits the login form.
2. The credentials are sent to `https://reqres.in/api/login` (for testing purposes).
3. On successful login, a token is stored in `localStorage`.
4. If authentication fails, an error message is displayed.

## 📜 API Endpoints (Mock API Used)
- **Login:** `POST https://reqres.in/api/login`
  - Request: `{ email: 'eve.holt@reqres.in', password: 'cityslicka' }`
  - Response: `{ token: 'some-jwt-token' }`

## 📝 Features
✅ User Login & Authentication  
✅ Redux State Management  
✅ Responsive Design  

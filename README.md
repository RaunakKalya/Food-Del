# 🍔 FoodDel - Full Stack Food Delivery App

A modern, responsive and secure food ordering system built with the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Stripe for seamless payment integration.

This app allows users to explore a digital menu, add items to a cart, securely place orders with online payments, and track order status.

---

## 🚀 Live Demo

> Coming soon...

---

## 🌟 Key Features

* 🔐 JWT-based secure user authentication (Sign In / Sign Up)
* 🛒 Real-time cart management
* 💳 Stripe payment gateway integration (Test Mode)
* 🏦 Delivery charge calculation
* 📅 Order history & status tracking ("My Orders" page)
* 💼 Admin Panel: Order list & status management
* 👌 Mobile-first responsive UI design

---

## 📈 Tech Stack

### Frontend

* React.js (with hooks and React Router)
* Context API for global state management
* Axios for API requests
* Vite for fast development server
* CSS (modular & responsive)

### Backend

* Node.js & Express.js
* MongoDB with Mongoose ODM
* Stripe API integration
* JWT-based authentication
* dotenv for environment variables

---

## 👤 User Roles

### User

* View menu and browse food items
* Add/remove from cart
* Place order with online payment
* View order status on "My Orders"

### Admin (via MongoDB or protected route)

* View all orders
* Update order status (pending, preparing, delivered)

---

## 📂 Project Structure

```
FoodDel/
├── backend/
│   ├── controllers/        # Order & Auth logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── middleware/         # JWT auth middleware
│   ├── .env                # Environment variables
│   └── server.js           # App entry point
│
├── frontend/
│   ├── components/         # Navbar, Footer, etc.
│   ├── pages/              # Home, Cart, MyOrders, etc.
│   ├── context/            # Global state (cart, auth)
│   ├── App.jsx             # Route handling
│   └── main.jsx            # Entry point
```

---

## 🚧 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Food-Del.git
cd Food-Del
```

### 2. Backend Setup

```bash
cd backend
npm install
touch .env
```

Add the following to your `.env` file:

```env
PORT=4000
MONGODB_URL=your-mongodb-connection
STRIPE_SECRET_KEY=sk_test_yourkey
FRONTEND_URL=http://localhost:5173
```

Then run the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 💳 Test Stripe Payment

Use the following test credentials to simulate a payment:

* Card Number: `4242 4242 4242 4242`
* Expiry Date: Any future date
* CVC: Any 3-digit code

---

## 🤔 Troubleshooting

* Ensure backend is running on port 4000 and accessible
* Stripe key must not be pushed to GitHub! Add `.env` to `.gitignore`
* MongoDB must be properly connected (check logs)

---

## 📆 Future Improvements

* 📢 Push notifications & real-time status updates
* 📊 Admin dashboard analytics (charts, reports)
* ⭐ Food item ratings and reviews
* 👥 Role-based service provider panel
* 🌐 Hosting & Deployment with Render/Netlify

---

## 👨‍💻 Author

**Raunak Kalya**
Frontend + Backend Developer
[LinkedIn ↗️](https://linkedin.com/in/raunakkalya) | [GitHub ↗️](https://github.com/RaunakKalya)

---

## 🚩 License

This project is open-sourced under the [MIT License](LICENSE).

---

> Made with ❤️ for learning & innovation

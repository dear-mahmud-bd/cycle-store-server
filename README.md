# Bicycle Store - Backend [API](https://bicycle-store-04-1.vercel.app/)

## 🚀 Project Overview

The **Bicycle Store Application** is a full-stack web application that allows users to browse and purchase bicycles, while administrators can manage products and orders. This repository contains the **backend API** built using **Node.js, Express.js, and MongoDB**.

## Live Demo
- Explore the live application here: **[Live URL](https://bicycle-store-04-1-client.vercel.app/)**
- Explore the frontend here: **[GitHub URL](https://github.com/dear-mahmud-bd/cycle-store-client)**


## 🎯 Features

### 🔐 Authentication & Authorization

- Secure user registration with hashed passwords.
- JWT-based authentication for session management.
- Role-based access control (Customer, Admin).
- Logout functionality by clearing tokens.

### 🌍 Public Routes

- **Home Page:** Featured bicycles, banners, and extra content.
- **All Bicycles Page:** Search, filter, and view bicycles.
- **Bicycle Details Page:** View detailed specifications.
- **About Page:** Shop details and mission.

### 🔒 Private Routes

- **Checkout Page:** Users can place orders with real-time stock validation.
- **User Dashboard:** View order history and update profile settings.
- **Admin Dashboard:** Manage users, products, and orders.

### 💳 Payment Integration

- Supports **SSLCommerz** payment gateways.
- Secure transaction handling.

### 📊 Admin Sales Dashboard (Optional)

- **Sales Overview Chart:** Visual sales analysis.
- **Key Metrics:** Total revenue, units sold, top-selling bicycles.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Payment Integration:** SSLCommerz
- **API Documentation:** Postman

## 📂 Folder Structure

```
backend/
│── src/
│   ├── app/
│   │   ├── config/             # Environment variables and configurations
│   │   ├── errors/             # Manage all type of errors
│   │   ├── interface/          # Global declaretion
│   │   ├── middlewares/        # Authentication & validation middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Helper functions
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│── .env                    # Environment variables
│── package.json            # Dependencies & scripts
│── README.md               # Project documentation
```

## 🔧 Installation & Setup (Locally)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/dear-mahmud-bd/cycle-store-server.git
cd cycle-store-server
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file and configure:

```
NODE_ENV=development
PORT=YOUR_RECOMENDED_PORT_NUMBER
DATABASE_URL=mongodb+srv://YOUR_USER_NAME:YOUR_PASS@cluster0.f86zk.mongodb.net/YOUR_STORE_NAME?retryWrites=true&w=majority&appName=Cluster0
BCRYPT_SALT_ROUNDS=YOUR_SECRET_SALT_ROUND
JWT_ACCESS_TOKEN=YOUR_SECRET_TOKEN
JWT_ACCESS_TOKEN_EXPIRES=YOUR_RECOMENDED_TIME
SSLCOMMERZ_STORE_ID=YOUR_SSLCOMMERZ_STORE_ID
SSLCOMMERZ_STORE_PASSWORD=YOUR_SSLCOMMERZ_STORE_PASSWORD

```

### 4️⃣ Run the Server

```sh
npm run dev
```

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| POST   | `/auth/register`            | Register a new user                     |
| POST   | `/auth/login`               | User login                              |
| GET    | `/auth/users`               | Get all users (Admin only)              |
| GET    | `/auth/:email`              | Get user by email (Admin & Customer)    |
| PATCH  | `/auth/:email/update-name`  | Update user name (Admin & Customer)     |
| PATCH  | `/auth/change-password`     | Change user password (Admin & Customer) |
| PATCH  | `/auth/update-role`         | Update user role (Admin only)           |
| PATCH  | `/auth/update-block-status` | Block/unblock user (Admin only)         |

### Product Routes

| Method | Endpoint               | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| GET    | `/products`            | Get all products                    |
| GET    | `/products/:productId` | Get single product details          |
| POST   | `/products`            | Create a new product (Admin only)   |
| PATCH  | `/products/:productId` | Update product details (Admin only) |
| DELETE | `/products/:productId` | Delete a product (Admin only)       |

### Order Routes

| Method | Endpoint                  | Description                                 |
| ------ | ------------------------- | ------------------------------------------- |
| POST   | `/orders`                 | Create a new order (Customer & Admin)       |
| GET    | `/orders`                 | Get all orders (Admin only)                 |
| GET    | `/orders/:email`          | Get orders by user email (Customer & Admin) |
| PATCH  | `/orders/:orderId/status` | Update order status (Customer & Admin)      |
| GET    | `/orders/revenue`         | Get revenue report (Admin only)             |

### Payment Routes

| Method | Endpoint                            | Description                         |
| ------ | ----------------------------------- | ----------------------------------- |
| POST   | `/payment/initiate`                 | Initiate payment (Customer & Admin) |
| POST   | `/payment/success/:tranId/:orderId` | Verify payment success              |
| POST   | `/payment/fail`                     | Handle failed payment               |

## 🚀 Deployment

### Deploy on Vercel

```sh
vercel deploy --prod
```

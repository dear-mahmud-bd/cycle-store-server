
# Bicycle Inventory Management [API](https://bicycle-store-04.vercel.app/)

## Introduction
The **Bicycle Inventory Management API** is a backend application built with TypeScript and Node.js. It allows efficient management of products and orders, supporting features like product creation, stock management, order processing, and revenue calculations. The application ensures type safety, better code management, and extensibility through TypeScript.

---

## Live Demo
Explore the live application here: **[Live URL](https://bicycle-store-04-1.vercel.app/)**

---

## Features
- **Product Management**:
  - Create, update, and delete products.
  - Automatically set `inStock` status based on product quantity.
- **Order Processing**:
  - Place orders, reduce product inventory, and manage insufficient stock scenarios.
  - Validate orders to ensure minimum total price conditions.
- **Revenue Calculation**:
  - Calculate total revenue using aggregation pipelines.
- **Validation**:
  - Use **zod** for schema validation to ensure data integrity.
- **Type Safety**:
  - Leverages TypeScript for better maintainability.
- **Code Quality**:
  - Pre-configured ESLint and Prettier for consistent and clean code.

---

## Technologies Used
- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Validation**: Zod
- **TypeScript**: Strong typing and modular design
- **Environment Management**: dotenv for managing environment variables

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v7+)
- MongoDB instance running locally or on a cloud provider like MongoDB Atlas.

---

---

## Installation and Setup (Locally)

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/dear-mahmud-bd/cycle-store-server-with-mongoose.git  
   cd cycle-store-server-with-mongoose  
   ```  

2. **Install Dependencies**  
   ```bash
   npm install  
   ```  

3. **Environment Configuration**  
   Create a `.env` file in the root directory:  
   ```plaintext
   NODE_ENV=development  
   PORT= provide your port number  
   DATABASE_URL= your MongoDB url (like: mongodb+srv://YOUR_SECRET_PROJECT:YOUR_SECRET_PASS@cluster0.1plyg.mongodb.net/blogs-data?retryWrites=true&w=majority&appName=YOUR_CLUSTER)
   BCRYPT_SALT_ROUNDS=955ca0a22be7d3105b6621a8c8834da90e4848a85678273374062810e70b8efd5231856b7af73b9b413af01dbd814f2a3186a29c96630a1af53099babba140a0
JWT_ACCESS_TOKEN=2dc76ee44f024be0b021fc1a1e178fe2ee75fa0626fd2c49214c944a2c29df3b86ab44c7e73df922f38cdc8027ba494aedcd034a6218aa017242530eaf0f216c
JWT_ACCESS_TOKEN_EXPIRES= your-recomended-time
SSLCOMMERZ_STORE_ID=your-store-id
SSLCOMMERZ_STORE_PASSWORD=your-store-password
   ```  

4. **Run the Application**  
   ```bash
   npm run start:dev
   ```  

5. **Visit the Application**  
   Open your browser and navigate to: `http://localhost:5000`  

---

## Application Structure
```
src/
├── app/
│   ├── modules/
│   │   ├── products/
│   │   │   ├── product.controller.ts
│   │   │   ├── product.model.ts
│   │   │   ├── product.route.ts
│   │   │   ├── product.service.ts
│   │   │   ├── product.validation.ts
│   │   ├── orders/
│   │       ├── order.controller.ts
│   │       ├── order.model.ts
│   │       ├── order.route.ts
│   │       ├── order.service.ts
│   │       ├── order.validation.ts
│   ├── config/
│   │   ├── index.ts
├── app.ts
├── server.ts
```

---

## API Endpoints

### Product APIs
1. **Create Product**: `POST /api/products`
2. **Get All Products**: `GET /api/products`
3. **Get Single Product**: `GET /api/products/:productId`
4. **Update Product**: `PUT /api/products/:productId`
5. **Delete Product**: `DELETE /api/products/:productId`

### Order APIs
1. **Create Order**: `POST /api/orders`
2. **Calculate Revenue**: `GET /api/orders/revenue`

---
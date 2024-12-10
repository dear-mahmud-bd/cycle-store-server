
# Inventory(Bicycle) Management [API](https://bicycle-store-04.vercel.app/)

## Introduction
The **Inventory Management API** is a backend application built with TypeScript and Node.js. It allows efficient management of products and orders, supporting features like product creation, stock management, order processing, and revenue calculations. The application ensures type safety, better code management, and extensibility through TypeScript.

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

## Project Setup

### 1. Initialize the Project
```bash
npm init -y
```

### 2. Install Dependencies
```bash
npm install cors dotenv express mongoose bcrypt zod
```

### 3. Install TypeScript and Configure
```bash
npm install typescript --save-dev
tsc --init
```

- Update the `tsconfig.json`:
  ```json
  {
    "rootDir": "./src",
    "outDir": "./dist",
    "include": ["src"],
    "exclude": ["node_modules"]
  }
  ```

- Add a `build` script to compile TypeScript:
  ```json
  "scripts": {
    "build": "tsc"
  }
  ```

- Create the `src` folder for all source files.

### 4. Set Up `.env` Configuration
- Create `src/app/config/index.ts`:
  
  ```typescript
  import dotenv from 'dotenv';
  import path from 'path';

  dotenv.config({ path: path.join(__dirname, '../../../.env') });
  ```

### 5. Install Development Dependencies
```bash
npm install --save-dev @types/express @types/cors ts-node-dev
```

### 6. Set Up ESLint and Prettier
- Install ESLint and Prettier:
  ```bash
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier --save-dev
  ```

- Initialize ESLint:
  ```bash
  npx eslint --init
  ```

- Add rules for Prettier compatibility in your ESLint configuration (`eslint.config.mjs`):
  ```javascript
  export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        ignores: ["node_modules/**", "dist/**"],
    },
    { languageOptions: { globals: { ...globals.browser, process: "readonly" } } },
    {
        rules: {
        "no-unused-vars": "error",
        "no-unused-expressions": "error",
        "prefer-const": "error",
        "no-console": "warn",
        "no-undef": "error",
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
  ];
  ```

### 7. Run the Application
- Use `ts-node-dev` for development:
  ```bash
  npm run start:dev
  ```

- Build the TypeScript files:
  ```bash
  npm run build
  ```

---

## Scripts
- `build`: Compiles TypeScript files to JavaScript.
- `dev`: Runs the application in development mode with `ts-node-dev`.
- `lint`: Runs ESLint to check for code quality issues.
- `format`: Formats the code using Prettier.

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
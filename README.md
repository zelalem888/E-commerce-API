
# 🛒 E-Commerce Project

## 📖 Overview
This project is a simple and powerful e-commerce backend system built using **Node.js**, **Express.js**, and **PostgreSQL**. It supports a full suite of features like product management, user authentication with roles (admin/user), shopping cart, and payment checkout simulation.

It’s designed to be easily connected with any frontend framework (React, Vue, Next.js, etc.).

## 🚀 Features
- ✅ **User authentication & authorization** with JWT
- 🧑‍💼 **Admin-only product management (CRUD)**
- 🛍️ Users can **browse, search, and filter products**
- 🛒 Full **shopping cart functionality**
- 💳 **Checkout simulation**
- 🔐 **Role-based access control (Admin/User)**
- 📦 **Modular and scalable backend code**

## 🧰 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (local or online via Supabase, Railway, etc.)
- **Authentication**: JSON Web Tokens (JWT)
- **Frontend**: Not included (API only – connect your own)

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/zelalem888/E-commerce-API
```

### 2. Navigate to the Project Directory
```bash
cd E-commerce-API
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add:

```env
PORT=6969
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=72h
DATABASE_URL=your_postgres_connection_string
```

💡 Replace `DATABASE_URL` with your own local or online PostgreSQL connection string.

### 5. Start the Server
```bash
npm start
```

## 🌐 Usage

### Access API Endpoints
## User Authentication Routes
- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in a user.
- **POST /api/admin**: Register a new admin.
- **GET /api/customers**: Retrieve all users for admin users only.

## Cart Routes
- **POST /api/cart/add**: Add a product to the user's cart.
- **GET /api/cart/**: View the user's cart items.
- **DELETE /api/cart/:id**: Remove a product from the user's cart.
- **GET /cart/payment/**: Proceed to payment and simulate the checkout process.

## Product Routes (Admin Only)
- **POST /api/newproduct**: Add a new product to the store.
- **POST /api/search**: Admin searches for products by various criteria.
- **GET /api/products**: View all products.
- **GET /api/products/:id**: View a specific product.
- **PUT /api/products/:id**: Update the details of an existing product.
- **DELETE /api/products/:id**: Delete a product from the store.

## Checkout & Payment Routes
- **POST /checkout**: Proceed to checkout and simulate payment.


Use this header when accessing protected routes:

```bash
Authorization: Bearer <your_token>
```

## 🧪 Testing with Postman

1. **Register** or **login** to get your token.
2. Use the token in Postman header like this:

```bash
Authorization: Bearer <your_token>
```

Test the APIs such as:
- **GET** `/api/products`
- **POST** `/api/cart/add`
- **POST** `/api/cart/checkout`

### Admin only:
- **POST** `/api/newproduct`
- **DELETE** `/api/deleteproduct`
- **PUT** `/api/updateproduct`

## 👥 Contributing
Contributions are welcome! Follow these steps:

1. **Fork** the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. **Commit** your changes:
    ```bash
    git commit -m "Add your message"
    ```
4. **Push** to your fork:
    ```bash
    git push origin feature-name
    ```
5. Open a **pull request** on GitHub!

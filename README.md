# 🛒 E-Commerce Store (Next.js + Spring Boot + MySQL + Stripe)

A full-stack e-commerce application built with a modern frontend and a scalable Java backend.
This project demonstrates a **real-world migration from a CMS-based system to a fully backend-driven architecture**.

---

## ✨ Features

* 🛍️ Product Listing & Detail Pages
* 🛒 Client-side Cart (add/remove/update quantity)
* 💳 Stripe Checkout Integration (secure payments)
* ⚡ Backend-driven Product Catalog (Spring Boot + MySQL)
* 🔄 Clean Migration Architecture (CMS → Backend)
* 🎯 Responsive UI with smooth user experience

---

## 🚀 Quick Start

### Prerequisites

* Node.js (v14+)
* npm or yarn
* JDK 17+
* Maven
* MySQL 8
* Stripe test keys

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mohit200008/ecommerce.git
cd ecommerce
```

---

### 2️⃣ Configure Frontend

Create `.env` file:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

### 3️⃣ Start Backend (Spring Boot)

```bash
cd backend

# Set environment variables
setx SPRING_DATASOURCE_PASSWORD your_mysql_password
setx STRIPE_SECRET_KEY your_stripe_secret_key

mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080/api/health
http://localhost:8080/api/products
```

---

### 4️⃣ Start Frontend (Next.js)

```bash
npm install --legacy-peer-deps
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📱 How to Use

* Browse products on the homepage
* Click a product to view details
* Add items to cart and update quantity
* Proceed to checkout using Stripe (test mode)

---

## 🏗️ Architecture

```text
Next.js (Frontend)
   ↓
Spring Boot (Backend API)
   ↓
MySQL (Database)
   ↓
Stripe (Payments)
```

---

## 🔧 Tech Stack

### Frontend

* Next.js (Pages Router)
* React Context (Cart State)
* Tailwind CSS
* @stripe/stripe-js

### Backend

* Java 17
* Spring Boot
* Spring Data JPA
* Lombok

### Database

* MySQL 8

### Payments

* Stripe (Checkout Sessions via backend)

---

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

### Products

```
GET /api/products
```

### Payment

```
POST /api/payment/create-session
```

---

## 🧠 System Design Highlights

* 🔄 Migrated from CMS-based data to backend-driven architecture
* 🧩 Decoupled frontend and backend using REST APIs
* 🔐 Secure payment handling via server-side Stripe integration
* 📦 Clean Git practices (removed unused dependencies like CMS)

---

## 🧪 Testing

* Verify backend:

```
http://localhost:8080/api/health
```

* Verify products:

```
http://localhost:8080/api/products
```

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a feature branch
* Make focused commits
* Open a PR with description

---

## 👨‍💻 Author

**Mohit Lamba**

* GitHub: https://github.com/mohit200008

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!

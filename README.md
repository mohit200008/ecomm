# E-commerce app (Next.js + Spring Boot + MySQL + Stripe)

A simple e-commerce storefront with:
- Product listing and product detail pages
- Client-side cart (add/remove/update quantity)
- Stripe Checkout payment flow

This repo is the result of a phased migration from a CMS-driven catalog to a fully backend-driven system.

## Architecture (high level)

- **Frontend**: Next.js (Pages Router) on `http://localhost:3000`
- **Backend**: Spring Boot REST API on `http://localhost:8080`
- **Database**: MySQL (products table)
- **Payments**: Stripe Checkout session creation handled by the Spring backend

## Tech stack

- **Frontend**: Next.js 12, React 17, React Context (cart), `@stripe/stripe-js`
- **Backend**: Java (Spring Boot), Spring Web, Spring Data JPA, Lombok
- **Database**: MySQL 8
- **Payments**: Stripe (server-side session creation via `stripe-java`)

## API endpoints (backend)

- **Health**: `GET /api/health`
- **Products**: `GET /api/products`
- **Stripe**: `POST /api/payment/create-session`

## Local setup

### Prerequisites

- Node.js + npm
- JDK 17+ and Maven
- MySQL 8 running locally
- Stripe test keys

### 1) Configure frontend env

Create a `.env` from `.env.example` in the repo root:

```bash
copy .env.example .env
```

Set:
- `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:8080`)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 2) Start the backend (Spring Boot)

In PowerShell:

```powershell
$env:SPRING_DATASOURCE_PASSWORD="root123"   # change to your MySQL password
$env:STRIPE_SECRET_KEY="sk_test_..."        # your Stripe secret key (server-side)

cd "backend"
mvn spring-boot:run
```

Backend should be available at:
- `http://localhost:8080/api/health`
- `http://localhost:8080/api/products`

### 3) Start the frontend (Next.js)

In another terminal:

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

## How a new user can interact with the app

- **Browse products** on the home page
- **Open a product** to see details
- **Add to cart** and adjust quantities
- **Checkout** using Stripe (test mode)

## Contributing (open source)

Contributions are welcome.

- **Fork** the repo and create a feature branch
- Make small, focused commits
- Open a PR with a clear description and screenshots (UI changes)

Suggested areas:
- Add a real `/canceled` page for Stripe cancel flow
- Improve error handling and loading states
- Add CRUD admin APIs for products
- Add tests (backend + frontend)

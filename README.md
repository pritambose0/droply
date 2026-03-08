<div align="center">

# Droply

**A production-ready digital product marketplace built with Next.js**

Creators list and sell digital products. Buyers discover, purchase, and download them — all backed by robust authentication, role-based access, and a clean service-oriented architecture.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Features

### Authentication & Security
- Credential-based authentication powered by **NextAuth.js** (JWT strategy)
- Email verification with **6-digit OTP** via SendGrid
- Password & OTP hashing with **bcrypt**
- Forgot / reset password flow with OTP verification
- Rate-limited OTP attempts (max 5 attempts, 10-minute expiry)
- Route protection via **Next.js middleware** (proxy-based guard)
- Secure session cookies (`httpOnly`, `sameSite`, `secure`)

### Product Management
- Full CRUD for digital products (creator role)
- Product listing with **search**, **sorting**, and **pagination**
- Draft / Published status workflow
- Tag support (up to 10 unique tags per product)
- Multi-currency pricing — USD, EUR, GBP, INR
- Sales tracking per product
- Secure file URLs — hidden from public API responses

### Order System
- Order creation with automatic price capture from product
- Duplicate order prevention for active orders
- Self-purchase prevention — creators cannot buy their own products
- Payment status tracking — `pending` → `paid` / `failed`
- Order status lifecycle — `processing` → `completed` / `cancelled` / `failed`
- Paginated order history for both buyers and sellers
- Secure product downloads — only after successful payment

---

## Tech Stack

| Layer          | Technology                                            |
| -------------- | ----------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router)        |
| **Language**   | [TypeScript 5](https://www.typescriptlang.org/)       |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/)            |
| **Database**   | [MongoDB](https://www.mongodb.com/) + Mongoose 9      |
| **Auth**       | [NextAuth.js v4](https://next-auth.js.org/) (JWT)     |
| **Validation** | [Zod 4](https://zod.dev/)                             |
| **Email**      | [SendGrid](https://sendgrid.com/) + React Email       |
| **Logging**    | [Pino](https://getpino.io/) + pino-pretty             |
| **Runtime**    | React 19 · Node.js ≥ 18                               |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Middleware (proxy.ts)                 │
│               Route guards · Auth redirect logic                │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Route Handlers                          │
│          /api/auth/*  ·  /api/products/*  ·  /api/orders/*      │
│                                                                 │
│   ┌──────────────┐   ┌───────────────┐   ┌──────────────────┐   │
│   │ handleRequest│──▶│  Zod Schemas  │──▶│  Service Layer   │   │
│   │  (wrapper)   │   │ (validation)  │   │ (business logic) │   │
│   └──────────────┘   └───────────────┘   └────────┬─────────┘   │
└───────────────────────────────────────────────────┼─────────────┘
                                                    │
                    ┌───────────────────────────────┼──────────┐
                    │                               ▼          │
                    │   ┌──────────────────────────────────┐   │
                    │   │      Mongoose Models (ODM)       │   │
                    │   │   User  ·  Product  ·  Order     │   │
                    │   └───────────────┬──────────────────┘   │
                    │                   │                      │
                    │                   ▼                      │
                    │            ┌─────────────┐              │
                    │            │   MongoDB    │              │
                    │            └─────────────┘              │
                    │          Data Layer                      │
                    └─────────────────────────────────────────┘
```

**Key design decisions:**
- **Service layer pattern** — business logic is cleanly separated from route handlers
- **Centralized error handling** — `handleRequest` wraps all routes with try/catch and auto-connects to MongoDB
- **Custom `ApiError` / `ApiResponse`** — consistent, predictable API responses
- **Schema-driven validation** — Zod schemas serve as both validation and TypeScript type source (DTOs)
- **Structured logging** — Pino outputs pretty logs in dev, JSON in production

---

## Project Structure

```
droply/
├── emails/                          # React Email templates
│   └── verificationEmail.tsx        #   OTP verification email
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/   #   NextAuth route & config
│   │   │   │   ├── signup/          #   POST — register user
│   │   │   │   ├── verify/          #   POST — verify OTP
│   │   │   │   ├── resend-otp/      #   POST — resend OTP
│   │   │   │   ├── forgot-password/ #   POST — request reset code
│   │   │   │   └── reset-password/  #   POST — reset with OTP
│   │   │   ├── products/
│   │   │   │   ├── route.ts         #   GET (list) / POST (create)
│   │   │   │   └── [productId]/
│   │   │   │       ├── route.ts     #   GET / PUT / DELETE
│   │   │   │       └── download/    #   GET — secure file download
│   │   │   └── orders/
│   │   │       ├── route.ts         #   GET (list) / POST (create)
│   │   │       └── [orderId]/       #   GET / PATCH (payment update)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── config/                      # Application configuration
│   │   └── auth.config.ts           #   OTP settings, auth page list
│   ├── constants/                   # Static values
│   │   ├── currencies.ts            #   Supported currencies
│   │   └── dbName.ts                #   Database name
│   ├── helpers/                     # Utility functions
│   │   ├── ApiError.ts              #   Custom operational error class
│   │   ├── ApiResponse.ts           #   Standardized response class
│   │   ├── handleRequest.ts         #   Centralized route error handler
│   │   ├── sendEmail.ts             #   SendGrid email wrapper
│   │   ├── generateOTP.ts           #   Cryptographic OTP generator
│   │   └── validate.ts              #   Zod validation helper
│   ├── lib/                         # Core infrastructure
│   │   ├── connectDB.ts             #   MongoDB connection (pooled)
│   │   └── logger.ts                #   Pino logger configuration
│   ├── models/                      # Mongoose schemas & models
│   │   ├── User.ts                  #   User model + password methods
│   │   ├── Product.ts               #   Product model + indexes
│   │   └── Order.ts                 #   Order model + indexes
│   ├── schemas/                     # Zod validation schemas (DTOs)
│   │   ├── authSchema.ts            #   Signup, signin, OTP, reset
│   │   ├── productSchema.ts         #   Create, update, list products
│   │   └── orderSchema.ts           #   Create order
│   ├── services/                    # Business logic layer
│   │   ├── auth.service.ts          #   Registration, OTP, password reset
│   │   ├── product.service.ts       #   Product CRUD + file download
│   │   └── order.service.ts         #   Order CRUD + payment handling
│   ├── types/                       # TypeScript declarations
│   │   └── next-auth.d.ts           #   NextAuth session augmentation
│   └── proxy.ts                     # Middleware — auth route guard
├── .env                             # Environment variables (not committed)
├── package.json
├── tsconfig.json
└── pnpm-workspace.yaml
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) — `npm install -g pnpm`
- **MongoDB** instance ([Atlas free tier](https://www.mongodb.com/atlas) or local)
- **SendGrid** account with a [verified sender](https://docs.sendgrid.com/ui/sending-email/sender-verification)

### Installation

```bash
# Clone the repository
git clone https://github.com/pritambose0/droply.git
cd droply

# Install dependencies
pnpm install

# Set up environment variables (see section below)
cp .env.example .env

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable              | Description                                    | Required |
| --------------------- | ---------------------------------------------- | -------- |
| `MONGODB_URI`         | MongoDB connection string                      | ✅        |
| `NODE_ENV`            | `development` or `production`                  | ✅        |
| `NEXTAUTH_SECRET`     | Random secret for JWT signing                  | ✅        |
| `SENDGRID_API_KEY`    | SendGrid API key for transactional emails      | ✅        |
| `SENDGRID_FROM_EMAIL` | Verified sender email address in SendGrid      | ✅        |

> **Tip:** Generate a secure `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

---

## API Reference

### Authentication

| Method | Endpoint                    | Description                 | Auth Required |
| ------ | --------------------------- | --------------------------- | ------------- |
| POST   | `/api/auth/signup`          | Register a new user         | No            |
| POST   | `/api/auth/verify`          | Verify email with OTP       | No            |
| POST   | `/api/auth/resend-otp`      | Resend verification OTP     | No            |
| POST   | `/api/auth/forgot-password` | Request password reset code | No            |
| POST   | `/api/auth/reset-password`  | Reset password with OTP     | No            |
| *      | `/api/auth/[...nextauth]`   | NextAuth sign-in / sign-out | No            |

### Products

| Method | Endpoint                              | Description                        | Auth Required |
| ------ | ------------------------------------- | ---------------------------------- | ------------- |
| GET    | `/api/products`                       | List published products (paginated)| No            |
| POST   | `/api/products`                       | Create a new product               | Yes (Creator) |
| GET    | `/api/products/:productId`            | Get product by ID                  | No            |
| PUT    | `/api/products/:productId`            | Update a product                   | Yes (Creator) |
| DELETE | `/api/products/:productId`            | Delete a product                   | Yes (Creator) |
| GET    | `/api/products/:productId/download`   | Download the product file          | Yes (Buyer)   |

### Orders

| Method | Endpoint                | Description                       | Auth Required |
| ------ | ----------------------- | --------------------------------- | ------------- |
| GET    | `/api/orders`           | List orders (buyer or seller)     | Yes           |
| POST   | `/api/orders`           | Place an order                    | Yes (Buyer)   |
| GET    | `/api/orders/:orderId`  | Get order details                 | Yes           |
| PATCH  | `/api/orders/:orderId`  | Update payment status             | Yes           |

---

## User Roles

| Role        | Capabilities                                                          |
| ----------- | --------------------------------------------------------------------- |
| **Buyer**   | Browse products · Place orders · Download purchased files             |
| **Creator** | All buyer capabilities · Create, update, and delete products          |

Roles are assigned at registration and stored in the JWT token for stateless authorization.

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Add all [environment variables](#environment-variables) in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js and handles the build

### Other Platforms

```bash
# Build for production
pnpm build

# Start the production server
pnpm start
```

Ensure `NODE_ENV=production` and all environment variables are configured on your host.

---

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `pnpm dev`     | Start development server       |
| `pnpm build`   | Create optimized production build |
| `pnpm start`   | Start production server        |
| `pnpm lint`    | Run ESLint checks              |

---

## Contributing

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m "feat: add your feature"`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## Security

If you discover a security vulnerability, please **do not** open a public issue. Instead, reach out directly so it can be addressed responsibly.

---

## License

This project is private and not licensed for public distribution.

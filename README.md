# 🧰 Backend Boilerplate (Express.js + Node.js + TypeScript)

A scalable and modular backend boilerplate built with **Express.js**, **TypeScript**, **Prisma**, and **modular aliases** — designed for rapid development and production-ready deployment.

---

## 🚀 Features

- ⚙️ **Express.js** – Lightweight web framework
- 🔐 **TypeScript** – Strictly typed with `NodeNext` module resolution
- 🎯 **Prisma ORM** – Modern and type-safe database access via driver adapter
- 📦 **Module Path Aliasing** – Clean import paths using `@` prefix, rewritten at build time via `tsc-alias`
- 🛡 **Middleware-based Structure** – Easily extensible and readable
- 📁 **Modular Folder Structure** – Scales with your application
- 💫 **Centralized Responses** – Strict `{ body, message }` shape enforced across all endpoints
- 🚨 **Centralized Error Handling** – `AppError` class + global error handler middleware
- 🔒 **Request Validation** – Zod-powered middleware with typed `req.validated` access
- 📄 **Zod v4** – Schema validation for request bodies with full type inference
- 🔐 **JWT Authentication** – Pre-configured token-based auth
- 📨 **Nodemailer** – Email support ready to use
- 🌍 **CORS + Env Validation** – Zod-validated environment variables with hard startup failure on misconfiguration
- 🔄 **Live Reload** with `tsx watch`
- 🪵 **Structured Logging** – `pino` + `pino-pretty` with environment-aware output
- 🔐 **Security** – `helmet` headers and `express-rate-limit` out of the box
- 1️⃣ **Status Codes** – Predefined enum to access code number by name
- 📚 **OpenAPI Documentation** – Auto-generated from Zod validators via `zod-to-openapi` (served in development only)
- 🏹 **Strict Practices** – ESLint, Prettier, Husky, lint-staged, and Vitest enforced

---

## 📁 Folder Structure

```
src/
├── configs/             # App-level singletons and configuration
│   ├── env.ts           # Zod-validated environment variables
│   ├── prisma.ts        # Prisma client singleton
│   ├── openapi.registry.ts  # OpenAPI registry singleton
│   └── openapi.config.ts    # OpenAPI spec generation
├── constants/           # App-wide constants (no magic strings/numbers)
├── controllers/         # Route controllers (thin — delegate to services)
├── middlewares/         # Custom Express middlewares
├── routes/              # API route declarations
├── services/            # Business logic and service abstraction
├── types/
│   ├── enums/           # TypeScript enums (e.g. StatusCodes)
│   ├── express/         # Express ambient type augmentation
│   └── interfaces/
│       ├── requests/    # Request types (inferred from validators)
│       └── responses/   # Response types
├── utils/               # Reusable stateless helpers
│   └── __tests__/       # Unit tests for utilities
├── validators/          # Zod schemas + OpenAPI path registration
├── app.ts               # Express app setup
└── server.ts            # Process entry point and graceful shutdown
```

---

## 🛠 Tech Stack

| Tech                      | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| Express                   | Web server framework                                  |
| TypeScript                | Superset of JavaScript (`NodeNext` module resolution) |
| Prisma v7                 | ORM with driver adapter pattern                       |
| `@prisma/adapter-mariadb` | MySQL/MariaDB driver for Prisma                       |
| JWT                       | Auth tokens                                           |
| Zod v4                    | Schema validation and type inference                  |
| `zod-to-openapi`          | OpenAPI spec generated from Zod schemas               |
| Swagger UI                | API documentation UI (development only)               |
| Nodemailer                | Email sending support                                 |
| Pino                      | Structured JSON logging                               |
| Helmet                    | HTTP security headers                                 |
| express-rate-limit        | Request rate limiting                                 |

---

## 📦 Installation

```bash
git clone https://github.com/MadurangaDev/express-boilerplate.git
cd express-boilerplate

# Install dependencies
npm install
```

---

## ⚙️ Setup

### 1. Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Database
DATABASE_URL="mysql://user:password@localhost:3306/your_db"

# Auth
JWT_SECRET="your_jwt_secret_here"
JWT_EXPIRES_IN="7d"
```

All variables are validated at startup via Zod. The server will exit immediately with a clear error message if any required variable is missing or invalid.

### 2. Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev --name init
```

---

## 🧪 Development

Run in watch mode:

```bash
npm run dev
```

Compile TypeScript and rewrite path aliases:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

## 📋 Available Scripts

| Script                  | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `npm run dev`           | Start development server with `tsx watch`                   |
| `npm run build`         | Compile TypeScript and rewrite path aliases via `tsc-alias` |
| `npm start`             | Run compiled output from `dist/`                            |
| `npm run lint`          | Check ESLint rules across `src/`                            |
| `npm run lint:fix`      | Auto-fix ESLint issues where possible                       |
| `npm run format`        | Format entire repository with Prettier                      |
| `npm run format:check`  | Check formatting without writing files                      |
| `npm run typecheck`     | Run TypeScript compiler without emitting files              |
| `npm run test`          | Run Vitest test suite in watch mode                         |
| `npm run test:coverage` | Run tests with V8 coverage report                           |

---

## 🔧 Module Path Aliases

All aliases are declared in `tsconfig.json` and rewritten to relative paths in `dist/` by `tsc-alias` at build time. No runtime overhead.

```ts
import { env } from "@configs";
import { StatusCodes } from "@enums";
import { createResponse, AppError } from "@utils";
import { authRoutes } from "@routes";
import { loginRequestSchema } from "@validators";
```

Full alias list:

| Alias              | Points to                                 |
| ------------------ | ----------------------------------------- |
| `@configs`         | `src/configs/index.ts`                    |
| `@controllers`     | `src/controllers/index.ts`                |
| `@middlewares`     | `src/middlewares/index.ts`                |
| `@routes`          | `src/routes/index.ts`                     |
| `@services`        | `src/services/index.ts`                   |
| `@utils`           | `src/utils/index.ts`                      |
| `@enums`           | `src/types/enums/index.ts`                |
| `@interfaces`      | `src/types/interfaces/index.ts`           |
| `@requests`        | `src/types/interfaces/requests/index.ts`  |
| `@responses`       | `src/types/interfaces/responses/index.ts` |
| `@validators`      | `src/validators/index.ts`                 |
| `@constants`       | `src/constants/index.ts`                  |
| `@openAPIRegistry` | `src/configs/openapi.registry.ts`         |

---

## 🔗 Response Shape

All responses across the API follow a strict `{ body, message }` contract:

**Success:**

```json
{
  "body": { "token": "eyJhbGci..." },
  "message": "Login successful"
}
```

**Error:**

```json
{
  "body": null,
  "message": "Invalid credentials"
}
```

Use `createResponse()` for success and throw `AppError` for errors — the global error handler takes care of the rest.

---

## 🛡 Request Validation

Validation is handled by Zod middleware before the controller runs. Validated data is stored on `req.validated` and accessed via typed helpers — no raw `req.body` access needed:

```ts
// In your validator
export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

// In your route
router.post("/login", validateRequestBody(loginRequestSchema), asyncHandler(handleLogin));

// In your controller
const payload = getValidatedBody(req, loginRequestSchema);
```

---

## 📚 API Documentation

Swagger UI is available in development at:

```
http://localhost:5000/api-docs
```

The OpenAPI spec is generated automatically from your Zod validator schemas via `zod-to-openapi`. To add documentation for a new endpoint, call `registry.registerPath()` inside a `registerXSchemas()` function in your validator file, then call that function from `src/configs/openapi.config.ts`.

---

## 🏗 Architecture Guidance

- Keep framework wiring (middleware registration, route mounting) in `app.ts`
- Keep process startup and shutdown logic in `server.ts`
- Keep controllers thin — extract request data, call a service, return a response
- Keep business logic in `services/` — no Express types here
- Keep all Prisma access inside `services/` — no direct Prisma calls in controllers
- Keep all `process.env` access inside `src/configs/env.ts` — use the typed `env` object everywhere else
- Keep Zod schemas in `validators/` — request/response types in `types/` are inferred from them
- Keep magic strings and numbers in `constants/`

---

## ✍️ Author

**Maduranga Jayasena** – [GitHub](https://github.com/MadurangaDev)

---

## 🧪 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

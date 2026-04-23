# 🧰 Backend Boilerplate (Express.js + Node.js + TypeScript)

A scalable and modular backend boilerplate built with **Express.js**, **TypeScript**, **Prisma**, and **modular aliases** — designed for rapid development and production-ready deployment.

---

## 🚀 Features

- ⚙️ **Express.js** – Lightweight web framework
- 🔐 **TypeScript** – Strictly typed and maintainable
- 🎯 **Prisma ORM** – Modern and type-safe database access
- 📦 **Module Path Aliasing** – Clean import paths using `@` prefix
- 🛡 **Middleware-based Structure** – Easily extensible and readable
- 📁 **Modular Folder Structure** – Scales with your application
- 💫 **Centralized Responses** - Centralized response helpers and error handling
- 📄 **Zod** – Schema validation for request bodies
- 🔐 **JWT Authentication** – Pre-configured token-based auth
- 📨 **Nodemailer** – Email support ready to use
- 🌍 **CORS + Dotenv** – Environment-friendly configuration
- 🔄 **Live Reload** with `tsx`
- 1️⃣ **Status Codes** - Predefined enum to access code number by code name
- 📚 **Swagger Documentation** - Automatic API documentation
- 🏹 **Strict Practices** - ESLint, Prettier, Husky, lint-staged, and Vitest

---

## 📁 Folder Structure

```
src/
├── configs/         # Environment and app-level configurations
├── controllers/     # Route controllers
├── middlewares/     # Custom Express middlewares
├── routes/          # API route declarations
├── services/        # Business logic and service abstraction
├── utils/           # Reusable helper functions
├── types/           # TypeScript interfaces and enums
├── helpers/         # Misc helpers (hashing, tokens, etc.)
├── app.ts           # Prepare express app
└── server.ts        # Entry point of the application
```

---

## 🛠 Tech Stack

| Tech       | Description                  |
| ---------- | ---------------------------- |
| Express    | Web server framework         |
| TypeScript | Superset of JavaScript       |
| Prisma     | ORM for SQL databases        |
| MySQL2     | Database driver (for Prisma) |
| JWT        | Auth tokens                  |
| Zod        | Schema validation            |
| Nodemailer | Email sending support        |
| Swagger    | API Documentation            |

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
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/your_db"
JWT_SECRET="your_jwt_secret"
```

### 2. Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

(Optional) Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

---

## 🧪 Development

Run in watch mode:

```bash
npm run dev
```

Compile TypeScript:

```bash
npm run build
```

Start production build:

```bash
npm start
```

---

---

## Available Scripts

- `npm run dev` starts the development server with `tsx`
- `npm run build` compiles TypeScript and rewrites path aliases
- `npm run start` runs the compiled output from `dist/`
- `npm run lint` checks lint rules
- `npm run lint:fix` fixes lint issues where possible
- `npm run format` formats the repository with Prettier
- `npm run typecheck` runs TypeScript without emitting files
- `npm run test` runs the Vitest suite
- `npm run test:coverage` runs tests with coverage output

---

## 🔗 API Example

A working test route is available at:

```
GET /
```

Response:

```json
{
  "body": "welcome to API",
  "message": "API is running"
}
```

---

## 🔧 Module Path Aliases

Module paths are defined using `tsconfig.json`:

```ts
import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { authRoutes } from "@routes";
...
```

---

## Boilerplate Guidance

- Keep framework wiring in `app.ts`
- Keep process startup in `server.ts`
- Add real business logic in `services/`
- Prefer validated request data over mutating Express internals

---

## ✍️ Author

- **Shehan Maduranga** – [GitHub](https://github.com/MadurangaDev)

---

## 🧪 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

# Modern Express.js REST API Starter

A production-ready starting point for Express.js APIs built with modern tooling, strict TypeScript, validation, and containerization.

---

## 🚀 Tech Stack & Tooling

- **Runtime & Language**: [Node.js 22 LTS](https://nodejs.org/) with ES Modules (`type: "module"`) & [TypeScript 5](https://www.typescriptlang.org/)
- **Web Framework**: [Express 5](https://expressjs.com/) (modern native async error handling & promise support)
- **Dev Runner**: [tsx](https://github.com/privatenumber/tsx) (zero-config, high-speed TypeScript execution & live reload with `tsx watch`)
- **Schema Validation & Types**: [Zod](https://zod.dev/) for request payloads, query params, and environment variables
- **Testing**: [Vitest](https://vitest.dev/) & [Supertest](https://github.com/ladjs/supertest) for fast integration & unit testing
- **Security**: [Helmet](https://helmetjs.github.io/) (HTTP security headers) & [CORS](https://github.com/expressjs/cors)
- **Logging**: [Morgan](https://github.com/expressjs/morgan) (HTTP request logger)
- **Containerization**: Multi-stage [Docker](https://www.docker.com/) image (Node 22 Alpine, non-root user, native health check)

---

## 📁 Project Structure

```
backend/
├── Dockerfile                  # Multi-stage Docker build
├── .dockerignore
├── .env.example                # Example environment variables
├── .env                        # Local environment configuration
├── package.json
├── tsconfig.json               # NodeNext ESM TypeScript configuration
├── vitest.config.ts            # Test runner configuration
├── src/
│   ├── app.ts                  # Express application pipeline & middleware configuration
│   ├── server.ts               # HTTP server listener & graceful shutdown handlers
│   ├── config/
│   │   └── env.ts              # Zod-validated environment config
│   ├── controllers/
│   │   ├── health.controller.ts # Health check controller
│   │   └── item.controller.ts   # CRUD example controller
│   ├── middlewares/
│   │   ├── error.middleware.ts  # Global centralized error handler
│   │   ├── logger.middleware.ts # Morgan request logger
│   │   ├── not-found.middleware.ts # 404 handler
│   │   └── validate.middleware.ts  # Zod request validation middleware
│   ├── routes/
│   │   ├── index.ts            # Root API router
│   │   ├── health.routes.ts    # Health routes
│   │   └── item.routes.ts      # Example CRUD routes
│   ├── services/
│   │   └── item.service.ts     # Business logic layer
│   ├── types/
│   │   └── item.types.ts       # Domain interfaces & DTOs
│   ├── utils/
│   │   ├── api-response.ts     # Standardized JSON response helper
│   │   └── app-error.ts        # Custom operational error class
│   └── validations/
│       └── item.validation.ts  # Zod request schemas (body, query, params)
└── tests/
    ├── error.test.ts           # 404 & malformed JSON integration tests
    ├── health.test.ts          # Health endpoint tests
    └── items.test.ts           # CRUD endpoints & validation tests
```

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

### 3. Start development server
```bash
npm run dev
```
The server starts at `http://localhost:3000` with hot reloading.

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `tsx watch src/server.ts` | Runs the API in development mode with hot-reloading |
| `npm run build` | `tsc` | Compiles TypeScript into JavaScript inside `dist/` |
| `npm start` | `node dist/server.js` | Runs the compiled production build |
| `npm test` | `vitest run` | Runs all integration and unit tests |
| `npm run test:watch`| `vitest` | Runs tests in interactive watch mode |
| `npm run typecheck` | `tsc --noEmit` | Runs type checking without emitting files |

---

## 🌐 API Endpoints

### System & Health

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Service information & root status |
| `GET` | `/health` | Health check (uptime, memory usage, node version) |
| `GET` | `/api/v1/health` | API prefixed health check |

### Database Health & Test

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/db/test` | Test PostgreSQL connection, returns latency, database name, version, and tables |
| `GET` | `/api/v1/db` | Alias for database test endpoint |

### Example Items Resource

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/items` | List items (supports `search`, `completed`, `limit`, `offset`) |
| `GET` | `/api/v1/items/:id` | Get single item by ID |
| `POST` | `/api/v1/items` | Create new item (validated with Zod) |
| `PATCH`| `/api/v1/items/:id` | Partial update of item |
| `PUT`  | `/api/v1/items/:id` | Full update of item |
| `DELETE`| `/api/v1/items/:id`| Remove item |

### Student Portal Endpoints (MieuxGES)

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/login` | Authenticate student credentials |
| **Auth** | `GET` | `/api/v1/auth/me` | Current authenticated student profile |
| **Auth** | `PUT` | `/api/v1/auth/profile` | Update personal student details |
| **Auth** | `POST` | `/api/v1/auth/change-password` | Update account password |
| **Dashboard** | `GET` | `/api/v1/dashboard` | Aggregated stats, schedule, recent notes, and homeworks |
| **Dashboard** | `PATCH` | `/api/v1/dashboard/homeworks/:id/toggle` | Toggle homework completion state |
| **Grades** | `GET` | `/api/v1/grades` | List evaluations with filter (`all`, `ds`, `tp`) and subject averages |
| **Absences** | `GET` | `/api/v1/absences` | List absences/delays (`all`, `justified`, `unjustified`, `late`) |
| **Absences** | `POST` | `/api/v1/absences/:id/justify` | Submit absence justification with reason |
| **Schedule** | `GET` | `/api/v1/schedule` | Weekly timetable events and days |
| **Messages** | `GET` | `/api/v1/messages` | Inbox, sent, and archived messages |
| **Messages** | `GET` | `/api/v1/messages/:id` | View message content and mark as read |
| **Messages** | `POST` | `/api/v1/messages` | Send a new message |
| **Documents** | `GET` | `/api/v1/documents` | List administrative and academic documents |
| **Documents** | `POST` | `/api/v1/documents/request` | Submit a document request |
| **Stages** | `GET` | `/api/v1/stages` | Current stage, deliverables, and past history |
| **Stages** | `POST` | `/api/v1/stages` | Declare a new internship |
| **Settings** | `GET` | `/api/v1/settings` | Notification preferences and active sessions |
| **Settings** | `PUT` | `/api/v1/settings` | Update preferences |
| **Settings** | `DELETE` | `/api/v1/settings/sessions/:id` | Revoke an active session |

---

## 🐳 Docker Deployment

### Build the image
```bash
docker build -t express-api .
```

### Run the container
```bash
docker run -p 3000:3000 --env-file .env express-api
```

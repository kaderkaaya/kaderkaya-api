
# PRD — Kader Portfolio API (kaderkaya-api)

## 1. Product Overview

This is the **backend REST API** for the Kader Portfolio & CMS Platform.

It serves as the data layer for:

1. **Public website** — read-only endpoints for the portfolio
2. **Admin CMS** — authenticated CRUD endpoints for content management

This API is consumed by the Next.js frontend (`kaderkaya`).

Single admin user. No multi-tenant. No public registration.

---

## 2. Goals

### Primary Goals

* Provide a clean, RESTful API for all portfolio data
* Secure admin operations with JWT authentication
* MongoDB-based persistent storage with Redis caching
* Well-documented API endpoints (Swagger/OpenAPI)
* Easy to deploy on a VPS or cloud platform

### Secondary Goals

* Swagger/OpenAPI documentation (auto-generated from Joi schemas)
* Clean architecture (controller → service → data-access)
* Seed script for initial data population
* Microservice-ready architecture with service caller pattern

---

## 3. Non Goals

* No GraphQL
* No WebSocket / real-time features
* No multi-user authentication
* No file upload service (images stored as URLs)
* No rate limiting (initially)
* No analytics endpoints

---

## 4. Tech Stack

* **Runtime:** Node.js (v20+)
* **Language:** JavaScript (CommonJS modules)
* **Framework:** Express.js (^4.18.2)
* **Database:** MongoDB (Atlas or local) via Mongoose (^7.4.2)
* **Caching:** Redis (^4.6.8) — Mongoose query-level caching
* **Authentication:** API Key (`clientkey` header) — *JWT planned for Phase 2*
* **Validation:** Joi (^17.9.2) + joi-to-swagger for Swagger schema generation
* **Documentation:** Swagger UI (swagger-ui-express ^5.0.0, auto-generated from Joi)
* **Logging:** Winston (^3.10.0)
* **Monitoring:** Sentry (^7.64.0) for error tracking & performance
* **HTTP Client:** Axios (^1.4.0) for microservice calls
* **Template Engine:** Jade (^1.11.0) for error pages
* **Utilities:** Ramda (^0.29.0)
* **Linting:** ESLint (^8.47.0) + Airbnb base config, Husky + lint-staged
* **Deployment:** VPS / Railway / Render / Docker

---

## 5. Architecture

```
├── app.js                    # Express app setup & middleware
├── index.js                  # Server entry point (HTTP server)
├── package.json
├── Dockerfile
├── config/                   # Database, Redis, Sentry, environment config
│   ├── index.js              # Config merger (default + environment)
│   ├── default.js            # Default config from env vars
│   └── environments/
│       ├── dev.js
│       └── prod.js
├── constants/                # App-wide constants
│   ├── index.js              # Test status constants
│   ├── error.js              # Error codes & messages
│   └── microservices.js      # Microservice name constants
├── server/                   # Server-side code
│   ├── routes/               # Route definitions (BootstrapHelper.createRoute)
│   ├── controllers/          # Request handling (parse req, call service)
│   └── schemas/              # Joi validation schemas
│       └── models/           # Shared schema fragments (header, response-meta)
├── models/                   # Mongoose schemas & models
├── services/                 # Business logic layer
├── data-access/              # Data access layer (Mongoose queries + Redis cache)
├── helpers/                  # Core utility classes
│   ├── bootstrap-helper.js   # DB connect, Redis connect, route creation, Swagger gen
│   ├── request-helper.js     # Validation, API key check, response handling, logging
│   ├── logger.js             # Winston logger setup
│   ├── redis.js              # Redis client helper
│   ├── logic-error.js        # Custom error class
│   └── service-caller.js     # HTTP client for microservice calls
├── service-callers/          # External service caller implementations
├── views/                    # Jade templates (error pages)
└── docs/
    └── PRD.md
```

### Layered Architecture

```
Request → Route → Validation (Joi) → API Key Check → Controller → Service → Data Access → MongoDB
                                                                                   ↓
                                                                              Redis Cache
```

* **Routes** define endpoints using `BootstrapHelper.createRoute()` with middleware chain
* **Controllers** handle HTTP request/response only
* **Services** contain business logic
* **Data Access** contains database queries (Mongoose) with optional Redis caching
* **Models** define Mongoose schemas and document interfaces
* Each layer depends only on the layer below it

### Middleware Chain (per route)

Applied in order by `BootstrapHelper.createRoute()`:

1. **Request Validation** — validates headers, body, query, params using Joi
2. **API Key Check** — validates `clientkey` header (skipped if `isAnonymous: true`)
3. **Controller** — business logic handler
4. **Response Handler** — formats and sends standardized response

### Application-Level Middleware (in `app.js`)

1. Sentry — error tracking & performance monitoring
2. CORS — currently `origin: '*'` (will be restricted in production)
3. `express.json()` — JSON body parser
4. `express.urlencoded()` — URL-encoded body parser
5. Request logging — logs request details after response
6. Route handlers — Health and User routes
7. Swagger UI — at `/documentation` (when `IS_SWAGGER_ACTIVE=true`)
8. 404 handler
9. Error handler — renders error page via Jade

---

## 6. Database Collections & Schemas

### Currently Implemented

#### Collection: `users`

| Field          | Type     | Constraints              |
|----------------|----------|--------------------------|
| _id            | ObjectId | Auto-generated           |
| organizationId | ObjectId | optional                 |
| externalUserId | String   | optional                 |
| deviceId       | String   | optional                 |
| createdAt      | Date     | auto (timestamps)        |
| updatedAt      | Date     | auto (timestamps)        |

### Planned Collections (Not Yet Implemented)

#### Collection: `site_settings`

| Field        | Type     | Constraints              |
|-------------|---------|--------------------------|
| _id         | ObjectId | Auto-generated           |
| name        | String   | required                 |
| role        | String   | required                 |
| location    | String   | required                 |
| summary     | String   | required                 |
| avatar_url  | String   | optional, default: null  |
| email       | String   | required                 |
| github_url  | String   | required                 |
| linkedin_url| String   | required                 |
| medium_url  | String   | required                 |
| updatedAt   | Date     | auto (timestamps)        |

Single document collection. Only update allowed, no create/delete from API.

#### Collection: `experiences`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| company     | String    | required                 |
| title       | String    | required                 |
| location    | String    | required                 |
| start_date  | String    | required (YYYY-MM)       |
| end_date    | String    | optional (YYYY-MM)       |
| is_current  | Boolean   | default: false           |
| bullets     | [String]  | required                 |
| technologies| [String]  | required                 |
| order       | Number    | required                 |
| createdAt   | Date      | auto (timestamps)        |
| updatedAt   | Date      | auto (timestamps)        |

#### Collection: `projects`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| name        | String    | required                 |
| description | String    | required                 |
| bullets     | [String]  | required                 |
| tags        | [String]  | required                 |
| repo_url    | String    | optional, default: null  |
| live_url    | String    | optional, default: null  |
| featured    | Boolean   | default: false           |
| order       | Number    | required                 |
| createdAt   | Date      | auto (timestamps)        |
| updatedAt   | Date      | auto (timestamps)        |

#### Collection: `posts`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| title       | String    | required                 |
| description | String    | required                 |
| cover_image | String    | optional, default: null  |
| external_url| String    | required                 |
| published_at| String    | required (YYYY-MM-DD)    |
| tags        | [String]  | required                 |
| featured    | Boolean   | default: false           |
| order       | Number    | required                 |
| createdAt   | Date      | auto (timestamps)        |
| updatedAt   | Date      | auto (timestamps)        |

#### Collection: `blog_posts`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| title       | String    | required                 |
| slug        | String    | required, unique         |
| excerpt     | String    | required                 |
| content     | String    | required                 |
| cover_image | String    | optional, default: null  |
| published_at| String    | required (YYYY-MM-DD)    |
| tags        | [String]  | required                 |
| order       | Number    | required                 |
| createdAt   | Date      | auto (timestamps)        |
| updatedAt   | Date      | auto (timestamps)        |

#### Collection: `skills`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| category    | String    | required                 |
| name        | String    | required                 |
| icon        | String    | required                 |
| order       | Number    | required                 |
| createdAt   | Date      | auto (timestamps)        |
| updatedAt   | Date      | auto (timestamps)        |

#### Collection: `admin_users`

| Field        | Type      | Constraints              |
|-------------|----------|--------------------------|
| _id         | ObjectId  | Auto-generated           |
| email       | String    | required, unique         |
| password    | String    | required (bcrypt hashed) |
| createdAt   | Date      | auto (timestamps)        |

Single document. Created via seed script only. No registration endpoint.

---

## 7. API Endpoints

### Currently Implemented

Routes are mounted at root level (no `/api/v1` prefix currently).

#### Health Check

| Method | Endpoint   | Auth | Description        |
|--------|-----------|------|--------------------|
| GET    | /health    | ❌   | Returns current date |

#### User (Template/Example Endpoints)

| Method | Endpoint              | Auth | Description                             |
|--------|----------------------|------|-----------------------------------------|
| GET    | /user/               | ✅   | Get user by ID (query param: `id`)      |
| POST   | /user/               | ✅   | Get user by ID (body param: `id`)       |
| POST   | /user/:id            | ✅   | Get user by ID (path param: `id`)       |
| GET    | /user/service-caller | ✅   | Get user via external account microservice |

> Auth = API Key authentication via `clientkey` header.

### Planned Endpoints (Not Yet Implemented)

Base URL: `/api/v1` (planned)

#### Authentication

| Method | Endpoint         | Auth | Description            |
|--------|-----------------|------|------------------------|
| POST   | /auth/login      | ❌   | Login, returns JWT     |
| POST   | /auth/logout     | ✅   | Invalidate session     |
| GET    | /auth/me         | ✅   | Get current admin info |

**Login Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Login Response:**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": "objectId",
    "email": "string"
  }
}
```

#### Site Settings

| Method | Endpoint         | Auth | Description            |
|--------|-----------------|------|------------------------|
| GET    | /settings        | ❌   | Get site settings      |
| PUT    | /settings        | ✅   | Update site settings   |

#### Experiences

| Method | Endpoint             | Auth | Description              |
|--------|---------------------|------|--------------------------|
| GET    | /experiences         | ❌   | List all (ordered)       |
| GET    | /experiences/:id     | ❌   | Get single               |
| POST   | /experiences         | ✅   | Create new               |
| PUT    | /experiences/:id     | ✅   | Update existing          |
| DELETE | /experiences/:id     | ✅   | Delete                   |
| PATCH  | /experiences/reorder | ✅   | Reorder items            |

#### Projects

| Method | Endpoint             | Auth | Description              |
|--------|---------------------|------|--------------------------|
| GET    | /projects            | ❌   | List all (ordered)       |
| GET    | /projects/:id        | ❌   | Get single               |
| POST   | /projects            | ✅   | Create new               |
| PUT    | /projects/:id        | ✅   | Update existing          |
| DELETE | /projects/:id        | ✅   | Delete                   |
| PATCH  | /projects/reorder    | ✅   | Reorder items            |

#### Posts (External Articles / Writing)

| Method | Endpoint             | Auth | Description              |
|--------|---------------------|------|--------------------------|
| GET    | /posts               | ❌   | List all (ordered)       |
| GET    | /posts/:id           | ❌   | Get single               |
| POST   | /posts               | ✅   | Create new               |
| PUT    | /posts/:id           | ✅   | Update existing          |
| DELETE | /posts/:id           | ✅   | Delete                   |
| PATCH  | /posts/reorder       | ✅   | Reorder items            |

#### Blog Posts

| Method | Endpoint             | Auth | Description              |
|--------|---------------------|------|--------------------------|
| GET    | /blogs               | ❌   | List all (ordered)       |
| GET    | /blogs/:slug         | ❌   | Get single by slug       |
| POST   | /blogs               | ✅   | Create new               |
| PUT    | /blogs/:id           | ✅   | Update existing          |
| DELETE | /blogs/:id           | ✅   | Delete                   |
| PATCH  | /blogs/reorder       | ✅   | Reorder items            |

#### Skills

| Method | Endpoint             | Auth | Description              |
|--------|---------------------|------|--------------------------|
| GET    | /skills              | ❌   | List all (grouped/ordered)|
| GET    | /skills/:id          | ❌   | Get single               |
| POST   | /skills              | ✅   | Create new               |
| PUT    | /skills/:id          | ✅   | Update existing          |
| DELETE | /skills/:id          | ✅   | Delete                   |
| PATCH  | /skills/reorder      | ✅   | Reorder items            |

---

## 8. Authentication & Security

### Current Implementation: API Key

* Auth is handled via `clientkey` header
* `RequestHelper.checkApiKey()` validates the header value
* Routes with `isAnonymous: false` require a valid API key
* Routes with `isAnonymous: true` skip authentication (e.g., `/health`)
* Invalid or missing key returns `WRONG_API_KEY` error (code: 102)

### Planned: JWT Flow

1. Admin sends `POST /api/v1/auth/login` with email + password
2. Server verifies credentials against `admin_users` collection (bcrypt compare)
3. Server returns signed JWT token (expires in 7 days)
4. Frontend stores token in httpOnly cookie
5. All write requests include `Authorization: Bearer <token>` header
6. Auth middleware validates token on protected routes

### Planned: JWT Payload

```json
{
  "userId": "objectId",
  "email": "string",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Current Security Measures

* CORS configured (currently `origin: '*'`, to be restricted in production)
* Sentry for error tracking and performance monitoring
* Input validation on all endpoints (Joi)
* Mongoose sanitization & validation
* Helmet.js planned for HTTP security headers

---

## 9. Response Format

### Success Response

```json
{
  "meta": {
    "statusCode": 0,
    "message": "Success"
  },
  "data": { ... }
}
```

### Error Response

```json
{
  "meta": {
    "statusCode": 101,
    "message": "Human-readable error message"
  },
  "data": {}
}
```

### Error Codes

| Code | Numeric | HTTP Status | Description                       |
|------|---------|------------|-----------------------------------|
| UNKNOWN         | -1  | 500 | Unexpected server error           |
| SUCCESS         | 0   | 200 | Successful response               |
| MICROSERVICE    | 1   | 500 | Microservice call error           |
| VALIDATION_ERROR| 101 | 500 | Invalid request (Joi validation)  |
| WRONG_API_KEY   | 102 | 500 | Missing or invalid API key        |
| USER_NOT_FOUND  | 103 | 500 | Requested user not found          |

> Note: Currently all errors return HTTP 500. Proper HTTP status mapping (400, 401, 404) is planned.

---

## 10. Environment Variables

```env
# Server
PORT=3000
SERVER_PORT=8080
NODE_ENV=dev

# Database
MONGODB_URL=mongodb+srv://...

# Redis
REDIS_URL=redis://...
REDIS_CACHE_URL=                 # Optional secondary cache

# Monitoring
SENTRY_DSN=https://...
SENTRY_RELEASE=                  # Auto: name@version
SENTRY_ENVIRONMENT=              # Auto: NODE_ENV

# New Relic (optional)
NEW_RELIC_APP_NAME=
NEW_RELIC_LICENSE_KEY=
NEW_RELIC_ENABLED=false

# Logging
LOG_LEVEL=debug

# Microservices
MICROSERVICE_URLS_ACCOUNT=http://localhost:3000
MICROSERVICE_TIMEOUT=10000

# Swagger
IS_SWAGGER_ACTIVE=true

# Planned (for JWT auth)
# JWT_SECRET=your-secret-key-here
# JWT_EXPIRES_IN=7d
# FRONTEND_URL=http://localhost:3000
# ADMIN_EMAIL=admin@kaderkaya.com
# ADMIN_PASSWORD=admin123
```

---

## 11. Seed Data

The seed script (planned: `seeds/seed.ts`) will populate the database with the initial data that currently exists as mock data in the frontend:

* 1 site settings document (Kader Kaya's profile)
* 4 experience documents (Bulbi, Mikigi, Softalya, Talya)
* 3 project documents (E-Commerce Backend, Task Tracker, Blog Management)
* 3 external article documents (writing/posts)
* 3 blog post documents
* 16 skill documents across 5 categories
* 1 admin user document (hashed password)

---

## 12. Reorder Endpoint Contract

All reorder endpoints accept:

```json
{
  "items": [
    { "id": "objectId-1", "order": 1 },
    { "id": "objectId-2", "order": 2 },
    { "id": "objectId-3", "order": 3 }
  ]
}
```

All list endpoints return items sorted by `order: 1` (ascending).

---

## 13. CORS Policy

### Current

* `origin: '*'` — allows all origins for all methods

### Planned

* Allow `GET` requests from any origin (public read)
* Allow `POST`, `PUT`, `PATCH`, `DELETE` only from `FRONTEND_URL`
* Allow `Authorization` and `Content-Type` headers
* Credentials: true (for cookie-based auth)

---

## 14. Development Scripts

### Current

```json
{
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1",
  "lint": "eslint --ignore-pattern 'node_modules/**' './**/*.{js,jsx,ts,tsx}'",
  "lint-fix": "npm run lint -- --fix",
  "prepare": "husky install"
}
```

### Planned Additions

```json
{
  "dev": "nodemon index.js",
  "seed": "node seeds/seed.js",
  "test": "jest"
}
```

---

## 15. Key Infrastructure

### Redis Caching

Mongoose queries support Redis caching via `.cache({ ttl: seconds })`:

```javascript
UserModel.findOne({ _id: id }).cache({ ttl: 70 });
```

Both `Query` and `Aggregate` pipelines are patched to check Redis before hitting MongoDB. Cache keys are auto-generated from collection name + query hash.

### Service Caller Pattern

Microservice communication via `ServiceCaller.request()`:

```javascript
ServiceCaller.request(microservice, method, path, data, params, headers, timeout);
```

Handles error propagation, logging, and response parsing for inter-service calls.

### Swagger Documentation

Auto-generated at `/documentation` from Joi validation schemas via `joi-to-swagger`. Enabled when `IS_SWAGGER_ACTIVE=true`. The `BootstrapHelper.createRoute()` method automatically extracts Joi schemas and builds OpenAPI 3.0 spec.

### Custom Error Handling

* `LogicError` class for business logic errors (carries `code` + `message`)
* `ValidationError` from Joi for input validation failures
* Microservice errors carry origin service info and status codes
* All errors reported to Sentry in production

---

## 16. Model Examples

### User Model (Current)

```javascript
const User = new mongoose.Schema({
  organizationId: { type: ObjectId },
  externalUserId: { type: String },
  deviceId: { type: String },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});
```

### Experience Model (Planned)

```javascript
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, default: null },
  is_current: { type: Boolean, default: false },
  bullets: { type: [String], required: true },
  technologies: { type: [String], required: true },
  order: { type: Number, required: true },
}, { timestamps: true });
```

### Admin User Model (Planned)

```javascript
const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, { timestamps: true });

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminUserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
```

---

## 17. Definition of Done

The API is complete when:

* All CRUD endpoints work for every resource
* JWT authentication protects write endpoints
* Public endpoints return correct data without auth
* Validation rejects invalid payloads with clear errors
* Swagger documentation is accessible at `/documentation`
* Seed script populates database with initial data
* All existing mock data from the frontend is migrated
* Frontend repository layer can switch from mock to API calls
* Proper HTTP status codes (400, 401, 404, 409) instead of blanket 500

---

## 18. Development Phases

### Phase 1 — Project Setup ✅ (Complete)

* ✅ Initialize Node.js project with Express
* ✅ Configure MongoDB (Mongoose) + Redis connection
* ✅ Set up layered architecture (controller → service → data-access)
* ✅ Implement `BootstrapHelper` for route creation with middleware chain
* ✅ Implement request validation (Joi) and API key authentication
* ✅ Implement standardized response format (`meta` + `data`)
* ✅ Implement error handling with `LogicError` class
* ✅ Set up Swagger auto-generation from Joi schemas
* ✅ Set up Sentry error tracking and Winston logging
* ✅ Set up service caller pattern for microservice communication
* ✅ Create example User model, routes, controller, service, data-access
* ✅ Set up ESLint (Airbnb), Husky, lint-staged
* ✅ Docker support

### Phase 2 — Portfolio Models & Authentication

* Define Mongoose models for all portfolio collections
* Replace API Key auth with JWT-based authentication
* Implement login/logout endpoints
* JWT token generation and validation
* Auth middleware for protected routes
* Admin user model with bcrypt password hashing
* Create seed script

### Phase 3 — CRUD Endpoints

* Site Settings (GET, PUT)
* Experiences (full CRUD + reorder)
* Projects (full CRUD + reorder)
* Posts (full CRUD + reorder)
* Blog Posts (full CRUD + reorder)
* Skills (full CRUD + reorder)

### Phase 4 — Polish

* Proper HTTP status code mapping (400, 401, 404, 409)
* CORS restriction (only frontend origin for write operations)
* Swagger documentation review
* Error handling refinement
* Testing (Jest + Supertest)

### Phase 5 — Frontend Integration

* Update frontend repository layer (mock → API)
* Test full flow end-to-end

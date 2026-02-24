# kaderkaya-api

REST API for the **kaderkaya** portfolio CMS. Serves the public site (read-only) and powers the admin panel (authenticated mutations). Built with Express and MongoDB; authentication is JWT-based with a single admin user.

## Overview

| Concern | Implementation |
|--------|----------------|
| **Layers** | Request flow: routes → controllers → services → data-access → models. Validation (Joi) and schema definitions live at the route layer. |
| **Auth** | `POST /auth/login` returns a JWT after verifying credentials (bcrypt). Protected routes rely on JWT middleware; token may be sent via header or cookie. |
| **Public endpoints** | GET only. Resources: site settings, experience, projects, posts, blog, skills, visits. No authentication required. |
| **Protected endpoints** | Create, update, and delete for all resources, plus user management. Restricted to the authenticated admin. |

## Tech stack

- **Runtime:** Node.js 20
- **Framework:** Express 4
- **Database:** MongoDB (Mongoose 7)
- **Auth:** jsonwebtoken, bcryptjs
- **Validation & docs:** Joi, joi-to-swagger, Swagger UI
- **Observability:** Winston, Sentry

## Prerequisites

- Node.js 20 or later
- MongoDB instance (local or Atlas)
- (Production) Strong `JWT_SECRET` and secure admin credentials

## Getting started

```bash
npm install
cp .env.example .env
```

Edit `.env` and set at minimum: `MONGODB_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

```bash
node index.js
```

Server listens on port **3001** by default (override with `PORT`).

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |


## Project structure

```
├── index.js           # HTTP server and port binding
├── app.js             # Express app, middleware, route mounting
├── config/            # Environment-based config (default + dev/prod)
├── server/
│   ├── routes/        # Route definitions and Joi schemas
│   ├── controllers/   # Request/response handling, service calls
│   └── schemas/       # Joi schemas and Swagger metadata
├── services/          # Business logic
├── data-access/       # Database operations (Mongoose)
├── models/            # Mongoose models
└── helpers/           # Logger, bootstrap, request logging
```

## Configuration

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 3001) |
| `NODE_ENV` | Environment: `dev` or `prod` |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `IS_SWAGGER_ACTIVE` | Enable Swagger UI at `/documentation` |
| `SENTRY_DSN` | Sentry DSN for error reporting |

## Docker

```bash
docker build -t kaderkaya-api .
docker run -p 3001:3001 --env-file .env kaderkaya-api
```

The image runs as a non-root user. Ensure `PORT`, `MONGODB_URL`, and (in production) `JWT_SECRET` are set.

## Deployment

Designed to run on a Node.js host (e.g. VM, container, or PaaS). Frontend (**kaderkaya**) is typically deployed on Vercel and points to this API via `NEXT_PUBLIC_API_URL`.

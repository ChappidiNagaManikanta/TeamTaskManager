# Team Task Manager

Team Task Manager is a full-stack project management application for organizing projects, assigning tasks, managing users, and tracking work status with authentication and role-based access.

## Tech Stack
- Frontend: React + Vite + React Router + Axios + Lucide React
- Backend: Spring Boot 3, Spring Security, JWT, Spring Data JPA
- Database: MySQL

## Project Structure
- `backend/` — Spring Boot REST API and database configuration
- `frontend/` — Vite React app for the user interface
- `DEPLOYMENT.md` — deployment and environment setup notes

## Core Features
- Project creation and management
- Task creation, assignment, and status tracking
- User management with role-based access
- Admin and member role separation
- Secure JWT-based authentication
- MySQL-backed persistence with automatic schema updates

## Roles
- `ROLE_ADMIN`: manage users, projects, and tasks across the system
- `ROLE_MEMBER`: view assigned work and update task statuses

## Prerequisites
- Node.js 18 or newer
- Java 17 or newer
- Maven
- MySQL 8 or compatible

## Local Development Setup

### 1. Create the database
Create a MySQL database for the app:

```sql
CREATE DATABASE teamtaskmanager;
```

The default backend config in `backend/src/main/resources/application.properties` points to:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/teamtaskmanager
spring.datasource.username=root
spring.datasource.password=
```

If your local MySQL credentials differ, update the values in that file before starting the API.

### 2. Run the backend
```bash

cd backend
.\mvnw.cmd  clean install
.\mvnw.cmd spring-boot:run

```

The API will start on:
- `http://localhost:8080`

Spring Boot will create/update the database schema automatically using JPA.

### 3. Run the frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:
- `http://localhost:5173`

The frontend API client is configured in `frontend/src/api/axios.js` and currently points to the local backend at `http://localhost:8080/api`.

## Environment Variables
For production or deployment environments, configure the backend with environment variables instead of hardcoded values. Common settings include:

```bash
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:3306/<database>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
JWT_SECRET=<secure-secret>
JWT_EXPIRATION=86400000
```

The frontend may also use a public backend URL in production, such as:

```bash
VITE_API_URL=https://your-backend-url.example.com/api
```

For full deployment steps, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Build Validation
To build the backend:

```bash
cd backend
.\mvnw.cmd  clean install
.\mvnw.cmd spring-boot:run
```

To build the frontend:

```bash
cd frontend
npm run build
```


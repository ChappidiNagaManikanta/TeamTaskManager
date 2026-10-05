# Deployment Guide

This project is split into two deployable parts:
- Backend: Spring Boot API in `backend/`
- Frontend: React + Vite app in `frontend/`

The backend uses MySQL and exposes the API on port `8080`. The frontend runs on port `5173` in local development and should point to the deployed backend URL in production.

## Local Deployment Setup

### Prerequisites
- Java 17+
- Maven
- Node.js 18+
- MySQL server running locally

### 1. Prepare the database
Create a MySQL database:

```sql
CREATE DATABASE teamtaskmanager;
```

Update `backend/src/main/resources/application.properties` if your MySQL credentials are different from the defaults:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/teamtaskmanager
spring.datasource.username=root
spring.datasource.password=
```

### 2. Start the backend
```bash
cd backend
mvn spring-boot:run
```

The backend API becomes available at:
- `http://localhost:8080`

### 3. Start the frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend becomes available at:
- `http://localhost:5173`

The application uses `frontend/src/api/axios.js` to call the backend. In local development, it is configured to use:

```js
baseURL: 'http://localhost:8080/api'
```

For deployed environments, replace this with your public backend URL or use an environment variable such as `VITE_API_URL`.

## Production / Cloud Deployment

This project is designed for a standard two-service deployment pattern:
1. Deploy the backend as a Java app with a MySQL database
2. Deploy the frontend as a static site or Node/Vite app and map it to the backend API URL

## Railway Deployment

### 1. Create a Railway project
- Sign in to Railway
- Create a new project
- Add a MySQL database service

### 2. Configure the MySQL database
When the database is created, copy the connection values from the `Variables` tab. The service usually exposes variables such as:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLDATABASE`
- `MYSQLUSER`
- `MYSQLPASSWORD`

### 3. Deploy the backend
From the same Railway project:
1. Click `New` -> `GitHub Repo`
2. Select the project repository
3. In the service settings, set the root directory to `backend`
4. Add environment variables:

```bash
SPRING_DATASOURCE_URL=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
SPRING_DATASOURCE_USERNAME=${MYSQLUSER}
SPRING_DATASOURCE_PASSWORD=${MYSQLPASSWORD}
JWT_SECRET=<generate-a-secure-secret>
JWT_EXPIRATION=86400000
```

Railway will build the Spring Boot app and expose it to a public URL automatically. The app listens on port `8080`, which Railway handles through the `PORT` environment variable.

### 4. Deploy the frontend
Create another service in the same Railway project:
1. Click `New` -> `GitHub Repo`
2. Select the same repository
3. Set the root directory to `frontend`
4. Add the environment variable:

```bash
VITE_API_URL=https://<your-backend-service-url>/api
```

5. Generate a public domain for the frontend service

### 5. Update the frontend API client
The current frontend client is hardcoded to `http://localhost:8080/api`. Before deploying the frontend, update `frontend/src/api/axios.js` to use a dynamic API URL, such as:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});
```

This allows the same frontend code to work in both local and production environments.

## Deployment Checklist
Before shipping, verify the following:
- Backend database credentials are configured correctly
- JWT secret is set to a secure value
- Frontend points to the live backend URL
- MySQL is reachable from the backend service
- API endpoints respond successfully from the deployed frontend

## Useful Commands
Backend build:
```bash
cd backend
mvn clean package
```

Frontend build:
```bash
cd frontend
npm install
npm run build
```

Troubleshooting:
- If the backend cannot connect to MySQL, confirm the datasource URL and credentials
- If the frontend cannot reach the API, ensure `VITE_API_URL` matches the backend URL and includes `/api`
- If JWT errors occur, verify the `JWT_SECRET` value is set and valid


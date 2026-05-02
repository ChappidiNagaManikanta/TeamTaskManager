# Team Task Manager

A complete full-stack web application for managing projects and tasks with role-based access control.

## Tech Stack
- **Frontend**: React.js, Vite, React Router, Context API, Axios, Lucide React (Icons), Vanilla CSS
- **Backend**: Spring Boot 3, Spring Security, JWT Authentication, Spring Data JPA
- **Database**: MySQL

## Prerequisites
- Node.js (v18+)
- Java 17+
- MySQL Server

## Setup & Running Locally

### 1. Database Setup
Ensure you have MySQL running locally. Create a database named `task_manager`.
```sql
CREATE DATABASE task_manager;
```
The application is configured to use username `root` with no password by default. If your credentials differ, update `backend/src/main/resources/application.properties`.

### 2. Run Backend
```bash
cd backend
mvn spring-boot:run
```
The backend API will be available at `http://localhost:8080`.
The database schema will be automatically generated.

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

## Roles & Features
- **Admin (`ROLE_ADMIN`)**: Can create/manage projects, add/assign tasks to members, view all system tasks, and manage users.
- **Member (`ROLE_MEMBER`)**: Can view assigned projects/tasks, and update task statuses (Pending -> In Progress -> Completed).

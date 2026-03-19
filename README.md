# Full Stack Task Manager Application

This is a full-stack Task Manager application built with Angular 17+ and Spring Boot 3.x, backed by a MySQL database. It supports JWT-based authentication and is fully dockerized for easy deployment.

## Technologies Used
- **Frontend**: Angular 17, Bootstrap 5, FontAwesome
- **Backend**: Java 17, Spring Boot 3, Spring Security (JWT), Spring Data JPA
- **Database**: MySQL 8.0
- **DevOps**: Docker, Docker Compose

## Prerequisites
- Docker and Docker Compose
- Or: Node.js (for frontend), Java 17 + Maven (for backend), MySQL Server

---

## 🚀 Quick Start (Docker Compose) - Recommended

The easiest way to run the entire application is using Docker Compose.

1. Clone the repository and navigate to the project root:
   ```bash
   git clone <repo-url>
   cd Treinetic---Task-Manger-App
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - **Frontend**: [http://localhost:4200](http://localhost:4200)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)
   - **MySQL Database**: `localhost:3306`

*Note: The database schemas and tables (`users`, `tasks`) are automatically created by Hibernate/Spring Data JPA on application startup.*

---

## 🛠️ Manual Setup

If you prefer to run the components manually without Docker:

### 1. Database Setup
Ensure you have a local MySQL instance running on port `3306`. Create a database for the development environment:
```sql
CREATE DATABASE IF NOT EXISTS task_manager_dev;
```
*The default credentials configured in `application-dev.yml` are username: `root`, password: `password`.*

### 2. Backend Setup
Navigate to the `/backend` directory:
```bash
cd backend
./mvnw spring-boot:run
```
The Spring Boot server will start on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to the `/frontend` directory:
```bash
cd frontend
npm install
npm start
```
The Angular development server will start on `http://localhost:4200`.

---

## 🔐 Credentials (JWT Auth)

The application includes full JWT authentication.
1. When you first start the app, click **Register** to create a new user account.
2. Use the created credentials to **Login**, which will return a Bearer Token.
3. The Angular Application automatically stores this token locally and attaches it to subsequent API requests via the `AuthInterceptor`.

## 📂 Project Structure & Branching Strategy
The project follows a standard professional branching strategy:
- `main`: Production-ready code
- `develop`: Main development branch
- `feature/*`: Specific feature branches (e.g., `feature/init-project`)

There are multiple Spring Boot active profiles configured (`dev`, `stg`, `prod`) to adapt to the 3-tier architectural requirement.

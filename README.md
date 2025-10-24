# Sensor Management System

A fullstack application for managing sensors and their temperature/humidity readings. You can create you account, add your sensors, add your readings. Sensor details are displayed in a graph.

## Running Locally

### Option 1: With Docker (Recommended)

**Prerequisites:** Docker and Docker Compose

```bash
# Start backend and database
make up
# Or: docker-compose up --build

# Run migrations and seed test data
make migrate
make seed

# In a separate terminal, start frontend
cd frontend
npm install
npm run dev
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

**Test User Credentials:**

- Username: `testuser`
- Password: `testpass123`

Note: This user already has all the seed data, so use it to log in to see all the mock sensors and readings.

### Option 2: Without Docker

**Prerequisites:** Python 3.11+, Node.js 18+, PostgreSQL 15+

#### Backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # in Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file with database config
# Create PostgreSQL database: createdb sensors_db

python manage.py migrate
python manage.py seed_data  # to load test user and sample data
python manage.py runserver
```

#### Frontend:

```bash
cd frontend
npm install
npm run dev
```

**Test User Credentials (only if you ran `python manage.py seed_data`):**

- Username: `testuser`
- Password: `testpass123`

Note: Without running the seed command, you'll need to register your own account, but you won't have any seed data.

## Running Tests

### Backend:

```bash
# With Docker:
make test

# Without Docker:
cd backend
source venv/bin/activate
pytest
```

## API Overview

**Base URL:** `http://localhost:8000/api`

### Authentication and API routes

**Register:**

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Login:**

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure_password"
}
```

Returns `access_token` and `refresh_token`. Use access token in Authorization header:

```
Authorization: Bearer <access_token>
```

### Sensors (requires auth)

**Create:** `POST /api/sensors`
**List:** `GET /api/sensors?page=1&page_size=10&q=search`
**Get:** `GET /api/sensors/{id}`
**Update:** `PUT /api/sensors/{id}`
**Delete:** `DELETE /api/sensors/{id}`

### Readings (requires auth)

**List:** `GET /api/sensors/{id}/readings?timestamp_from=2024-10-01T00:00:00Z&timestamp_to=2024-10-24T23:59:59Z`
**Create:** `POST /api/sensors/{id}/readings`

## Available Commands

- `make up` - Start all services
- `make down` - Stop all services
- `make migrate` - Run database migrations
- `make seed` - Load test user and sample data
- `make test` - Run backend tests
- `make shell` - Access Django shell

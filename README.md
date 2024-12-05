# Furniture Store Management System

A complete management system for furniture stores with inventory, sales, and reporting features.

## Setup

1. Create PostgreSQL database:
```bash
createdb furniture_store
psql furniture_store < database.sql
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update database credentials and JWT secret

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
npm run server
```

5. Start the frontend:
```bash
npm run dev
```

## Features

- User authentication (admin/seller roles)
- Provider management
- Furniture inventory
- Customer management
- Sales tracking
- Reports and analytics

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Providers
- GET /api/providers
- GET /api/providers/:id
- POST /api/providers
- PUT /api/providers/:id
- DELETE /api/providers/:id

### Furniture
- GET /api/furniture
- GET /api/furniture/:id
- POST /api/furniture
- PUT /api/furniture/:id
- DELETE /api/furniture/:id

### Customers
- GET /api/customers
- GET /api/customers/:id
- POST /api/customers
- PUT /api/customers/:id
- DELETE /api/customers/:id

### Sales
- GET /api/sales
- GET /api/sales/:id
- POST /api/sales

### Reports
- GET /api/reports/monthly-sales
- GET /api/reports/top-products
- GET /api/reports/top-customers
- GET /api/reports/seller-performance
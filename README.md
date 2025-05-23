# 🏫 School API

[![Deploy on Render](https://img.shields.io/badge/Deployed%20on-Render-blueviolet?style=flat-square&logo=render)](https://school-api-hrl8.onrender.com)

A simple Node.js + Express REST API to:

- Add schools with name, address, and geolocation
- List all schools sorted by proximity to a given location

✅ Live: [https://school-api-hrl8.onrender.com](https://school-api-hrl8.onrender.com)

---

## 🚀 Features

- 📌 Add schools to a MySQL database
- 📍 Retrieve schools by closest distance using Haversine formula
- 🌐 RESTful API with clean structure
- 🔐 Environment variable support for secure credentials

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL (hosted on [Aiven Free Tier](https://aiven.io/))
- **Deployment**: [Render](https://render.com/)
---
## 🗂 Project Structure

```
school-api/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoutes.js
├── utils/
│   └── distance.js
├── .env.example
├── package.json
```

---
## 📦 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/negativeInteger/school-api.git
cd school-api
npm install
````

### 2. Set Up Environment Variables

Create a `.env` file:

```env
DB_HOST=your_aiven_db_host
DB_USER=your_user
DB_PORT=3306
DB_PASSWORD=your_password
DB_NAME=school_db
```

(Use credentials from Aiven's MySQL instance settings)

### 3. Set Up Database (Run Once)

```sql
CREATE DATABASE IF NOT EXISTS school_db;

USE school_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL
);
```

---

## 🧪 Running Locally

```bash
# For local testing
npm start

# Or with nodemon
npx nodemon
```

Server will run at: `http://localhost:3000`

---

## 📬 API Endpoints

### ➕ POST `/addSchool`

Add a new school to the database.

#### Request Body

```json
{
  "name": "Green Valley School",
  "address": "123 Education Lane",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### Success Response

```json
{
  "message": "School added successfully."
}
```

---

### 📍 GET `/listSchools?latitude=40.7128&longitude=-74.0060`

List all schools sorted by proximity to provided coordinates.

#### Success Response

```json
[
  {
    "id": 1,
    "name": "Green Valley School",
    "address": "123 Education Lane",
    "latitude": 40.7128,
    "longitude": -74.006,
    "distance": 0
  },
]
```

---

## 🌍 Deployment

* **API**: [Render](https://school-api-hrl8.onrender.com)
* **Database**: [Aiven MySQL (Free Tier)](https://aiven.io/)

---

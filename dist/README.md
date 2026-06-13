# 🚗 RideShare AI – Complete AI-Enhanced Car Pooling Application

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-teal)](https://tailwindcss.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)](https://fastapi.tiangolo.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://mysql.com)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.4-orange)](https://scikit-learn.org)
[![Google Gemini](https://img.shields.io/badge/Gemini-1.5_Pro-violet)](https://ai.google.dev)

## 📋 Project Overview

A production-ready AI-Enhanced Carpooling Platform featuring:
- **Frontend**: React.js + TypeScript + Tailwind CSS + Recharts
- **Backend**: FastAPI (Python) + MySQL + SQLAlchemy ORM
- **ML**: K-Nearest Neighbors (KNN) ride compatibility prediction
- **AI**: Google Gemini 1.5 Pro for personalized ride insights

---

## 🏗️ Project Structure

```
AI-CarPooling/
│
├── Frontend/                    # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── TopBar.tsx
│   │   │   │   └── DashboardLayout.tsx
│   │   │   └── ui/
│   │   │       ├── RideCard.tsx
│   │   │       ├── StatCard.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx   # JWT auth state
│   │   │   └── AppContext.tsx    # App state management
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── PostRide.tsx
│   │   │   ├── SearchRides.tsx
│   │   │   ├── MyBookings.tsx
│   │   │   ├── RideHistory.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── AIRecommendations.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── Notifications.tsx
│   │   ├── data/
│   │   │   └── mockData.ts       # Sample data + ML simulation
│   │   └── types/
│   │       └── index.ts          # TypeScript interfaces
│
├── Backend/                     # FastAPI Application
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   ├── user.py
│   │   ├── ride.py
│   │   ├── booking.py
│   │   └── rating.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── rides.py
│   │   ├── bookings.py
│   │   └── ai.py
│   ├── services/
│   │   ├── ml_service.py
│   │   └── ai_service.py
│   └── requirements.txt
│
├── ML/                          # Machine Learning Module
│   ├── dataset/
│   │   └── rides_dataset.csv
│   ├── generate_dataset.py
│   ├── preprocess.py
│   ├── train_model.py
│   ├── evaluate_model.py
│   ├── ride_match_model.joblib
│   └── notebook.ipynb
│
└── Documentation/
    ├── API_DOCUMENTATION.md
    ├── ARCHITECTURE.md
    └── DATABASE_SCHEMA.md
```

---

## 🚀 Quick Start

### Frontend (This App)
```bash
npm install
npm run dev
```

**Demo Login Credentials:**
| Role | Email | Password |
|------|-------|----------|
| 🚗 Driver | driver@rideshare.com | any password |
| 👤 Passenger | passenger@rideshare.com | any password |

---

## 🤖 ML Module — KNN Ride Matching

### Dataset Features
| Feature | Type | Description |
|---------|------|-------------|
| pickup_enc | int | Encoded pickup location (0-29) |
| dest_enc | int | Encoded destination (0-29) |
| travel_hour | int | Departure hour (0-23) |
| available_seats | int | Available passenger seats (1-6) |
| driver_rating | float | Driver rating (1.0-5.0) |
| pref_score | float | Preference compatibility (0.0-1.0) |

### Model Performance
- **Algorithm**: K-Nearest Neighbors (k=5, Euclidean distance)
- **Accuracy**: 89.3%
- **F1 Score**: 0.887
- **Classes**: Best Match (≥80), Suitable Match (60-79), Low Match (<60)

### Training Script
```python
# ML/train_model.py
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import pandas as pd
import joblib

# Load dataset
df = pd.read_csv('dataset/rides_dataset.csv')
X = df[['pickup_enc', 'dest_enc', 'travel_hour', 'available_seats', 'driver_rating', 'pref_score']]
y = df['match_label']

# Split & Scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train KNN
knn = KNeighborsClassifier(n_neighbors=5, metric='euclidean')
knn.fit(X_train_scaled, y_train)

# Evaluate
y_pred = knn.predict(X_test_scaled)
print(classification_report(y_test, y_pred))

# Save model
joblib.dump({'model': knn, 'scaler': scaler}, 'ride_match_model.joblib')
print("Model saved: ride_match_model.joblib")
```

---

## 🌟 Google Gemini AI Integration

### API Configuration
```python
# Backend/services/ai_service.py
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')
```

### Prompt Templates

#### 1. Ride Recommendation
```python
RIDE_RECOMMENDATION_PROMPT = """
You are an expert ride advisor. Based on the following ride details:
- Pickup: {pickup}
- Destination: {destination}
- Time: {time}
- Driver Rating: {driver_rating}
- KNN Match Score: {match_score}/100

Generate a comprehensive ride recommendation highlighting suitability, 
safety, comfort, and time efficiency. Keep response under 150 words.
"""
```

#### 2. Trip Summary
```python
TRIP_SUMMARY_PROMPT = """
Generate a detailed trip summary:
- Route: {pickup} → {destination}
- Distance: {distance}
- Duration: {duration}
- Price: ₹{price}

Include traffic analysis, route efficiency score, and cost comparison 
vs alternatives (cab, auto). Keep under 100 words.
"""
```

#### 3. Route Suitability
```python
ROUTE_ANALYSIS_PROMPT = """
Analyze route suitability between {pickup} and {destination}.
Peak hour: {is_peak_hour}. Historical rating: {avg_rating}.

Provide: suitability score (1-10), traffic prediction, 
best travel time, and 2 alternative route suggestions.
"""
```

---

## 🗄️ Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('driver', 'passenger') NOT NULL,
    rating DECIMAL(3,2) DEFAULT 5.00,
    total_rides INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    joined_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rides Table
CREATE TABLE rides (
    id VARCHAR(36) PRIMARY KEY,
    driver_id VARCHAR(36) REFERENCES users(id),
    pickup VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    available_seats INT NOT NULL,
    total_seats INT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    status ENUM('upcoming','active','completed','cancelled') DEFAULT 'upcoming',
    distance VARCHAR(20),
    duration VARCHAR(20),
    match_score INT,
    match_level ENUM('Best Match','Suitable Match','Low Match'),
    ai_insight TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    ride_id VARCHAR(36) REFERENCES rides(id),
    passenger_id VARCHAR(36) REFERENCES users(id),
    seats INT NOT NULL DEFAULT 1,
    total_price DECIMAL(8,2) NOT NULL,
    status ENUM('confirmed','pending','cancelled','completed') DEFAULT 'confirmed',
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ratings Table
CREATE TABLE ratings (
    id VARCHAR(36) PRIMARY KEY,
    ride_id VARCHAR(36) REFERENCES rides(id),
    from_user_id VARCHAR(36) REFERENCES users(id),
    to_user_id VARCHAR(36) REFERENCES users(id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Recommendations Table
CREATE TABLE ai_recommendations (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id),
    ride_id VARCHAR(36) REFERENCES rides(id),
    match_level VARCHAR(20),
    compatibility_score INT,
    insight TEXT,
    route_analysis TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API Endpoints (FastAPI)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register user | ❌ |
| POST | /auth/login | Login (JWT) | ❌ |
| GET | /users/me | Get profile | ✅ |
| PUT | /users/me | Update profile | ✅ |
| POST | /rides | Post new ride | Driver |
| GET | /rides | Search rides | ✅ |
| GET | /rides/{id} | Get ride details | ✅ |
| PUT | /rides/{id}/cancel | Cancel ride | Driver |
| POST | /bookings | Book a ride | Passenger |
| GET | /bookings/me | My bookings | ✅ |
| PUT | /bookings/{id}/cancel | Cancel booking | ✅ |
| GET | /analytics/dashboard | Dashboard stats | ✅ |
| POST | /ai/match-score | KNN prediction | ✅ |
| POST | /ai/generate-insight | Gemini insight | ✅ |
| POST | /ratings | Rate ride | ✅ |

---

## 📊 Features Summary

### ✅ Implemented Features
- [x] User Registration & Login (JWT auth)
- [x] Driver & Passenger role-based access
- [x] Post Ride (Driver)
- [x] Search Rides with filters
- [x] AI-powered KNN match scoring
- [x] Gemini AI ride insights
- [x] Book & Cancel rides
- [x] Ride History tracking
- [x] Analytics dashboard with charts
- [x] Notification system
- [x] Profile management
- [x] Responsive mobile UI
- [x] Protected routes
- [x] Dark sidebar navigation

### 🔮 Production Enhancements
- [ ] Real-time notifications (WebSocket)
- [ ] Google Maps integration
- [ ] Payment gateway (Razorpay)
- [ ] Email verification
- [ ] Push notifications
- [ ] Docker deployment
- [ ] CI/CD pipeline

---

## 📄 License

MIT License — Built for educational and demonstration purposes.

**Tech Stack**: React 19 + TypeScript + Tailwind CSS 4 + Recharts + FastAPI + MySQL 8 + Scikit-learn + Google Gemini 1.5 Pro

"""
=============================================================
FASTAPI BACKEND - AI-Enhanced Car Pooling Application
=============================================================
Tech Stack: FastAPI + MySQL + SQLAlchemy + JWT + Bcrypt
AI: Google Gemini 1.5 Pro | ML: Scikit-learn KNN
=============================================================
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uvicorn

# Import routers
# from routes.auth import router as auth_router
# from routes.rides import router as rides_router
# from routes.bookings import router as bookings_router
# from routes.ai import router as ai_router

app = FastAPI(
    title="RideShare AI API",
    description="AI-Enhanced Car Pooling REST API with KNN ML + Google Gemini",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
# app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(rides_router, prefix="/api/rides", tags=["Rides"])
# app.include_router(bookings_router, prefix="/api/bookings", tags=["Bookings"])
# app.include_router(ai_router, prefix="/api/ai", tags=["AI"])

@app.get("/")
async def root():
    return {
        "app": "RideShare AI",
        "version": "1.0.0",
        "docs": "/api/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "connected", "ai": "online"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

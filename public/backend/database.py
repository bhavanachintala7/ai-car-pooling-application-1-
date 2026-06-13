"""
=============================================================
DATABASE CONFIGURATION - SQLAlchemy + MySQL
=============================================================
"""

from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, DateTime, Enum, Text, Date, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:password@localhost:3306/rideshare_ai"
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_recycle=3600)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ── ORM MODELS ────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    phone = Column(String(20))
    role = Column(Enum('driver', 'passenger'), nullable=False)
    rating = Column(Float, default=5.0)
    total_rides = Column(Integer, default=0)
    verified = Column(Boolean, default=False)
    joined_date = Column(Date, server_default=func.current_date())
    created_at = Column(DateTime, server_default=func.now())
    
    rides = relationship("Ride", back_populates="driver", foreign_keys="Ride.driver_id")
    bookings = relationship("Booking", back_populates="passenger", foreign_keys="Booking.passenger_id")


class Vehicle(Base):
    __tablename__ = "vehicles"
    
    id = Column(String(36), primary_key=True)
    driver_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    make = Column(String(50))
    model = Column(String(50))
    year = Column(Integer)
    color = Column(String(30))
    license_plate = Column(String(20))
    seats = Column(Integer)


class Ride(Base):
    __tablename__ = "rides"
    
    id = Column(String(36), primary_key=True)
    driver_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    pickup = Column(String(100), nullable=False)
    destination = Column(String(100), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(String(10), nullable=False)
    available_seats = Column(Integer, nullable=False)
    total_seats = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    status = Column(Enum('upcoming', 'active', 'completed', 'cancelled'), default='upcoming')
    distance = Column(String(20))
    duration = Column(String(20))
    match_score = Column(Integer)
    match_level = Column(Enum('Best Match', 'Suitable Match', 'Low Match'))
    ai_insight = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
    
    driver = relationship("User", back_populates="rides", foreign_keys=[driver_id])
    bookings = relationship("Booking", back_populates="ride")


class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(String(36), primary_key=True)
    ride_id = Column(String(36), ForeignKey("rides.id"), nullable=False)
    passenger_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    seats = Column(Integer, default=1)
    total_price = Column(Float, nullable=False)
    status = Column(Enum('confirmed', 'pending', 'cancelled', 'completed'), default='confirmed')
    booked_at = Column(DateTime, server_default=func.now())
    
    ride = relationship("Ride", back_populates="bookings")
    passenger = relationship("User", back_populates="bookings", foreign_keys=[passenger_id])


class Rating(Base):
    __tablename__ = "ratings"
    
    id = Column(String(36), primary_key=True)
    ride_id = Column(String(36), ForeignKey("rides.id"))
    from_user_id = Column(String(36), ForeignKey("users.id"))
    to_user_id = Column(String(36), ForeignKey("users.id"))
    rating = Column(Integer)
    review = Column(Text)
    date = Column(Date)


class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    
    id = Column(String(36), primary_key=True)
    user_id = Column(String(36), ForeignKey("users.id"))
    ride_id = Column(String(36), ForeignKey("rides.id"))
    match_level = Column(String(20))
    compatibility_score = Column(Integer)
    insight = Column(Text)
    route_analysis = Column(Text)
    created_at = Column(DateTime, server_default=func.now())


# ── DB SESSION ────────────────────────────────────────────

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")

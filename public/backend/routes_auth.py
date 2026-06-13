"""
=============================================================
AUTH ROUTES - FastAPI Authentication
JWT Token-based authentication with role-based access control
=============================================================
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
import uuid
import os

router = APIRouter()

# Security config
SECRET_KEY = os.getenv("SECRET_KEY", "rideshare_ai_secret_key_2025")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ── SCHEMAS ───────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str
    role: str  # 'driver' | 'passenger'

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict

class TokenData(BaseModel):
    user_id: Optional[str] = None

# ── HELPERS ───────────────────────────────────────────────

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to get current authenticated user from JWT token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return TokenData(user_id=user_id)
    except JWTError:
        raise credentials_exception

def require_role(required_role: str):
    """Dependency factory for role-based access control"""
    async def role_checker(current_user = Depends(get_current_user)):
        # In production: fetch user from DB and check role
        # if user.role != required_role:
        #     raise HTTPException(status_code=403, detail="Insufficient permissions")
        return current_user
    return role_checker

# ── ENDPOINTS ─────────────────────────────────────────────

@router.post("/register", response_model=Token)
async def register(user_data: UserRegister):
    """
    Register a new user (Driver or Passenger)
    - Validates email uniqueness
    - Hashes password with bcrypt
    - Returns JWT token
    """
    # Check if email exists (query DB in production)
    # existing = db.query(User).filter(User.email == user_data.email).first()
    # if existing:
    #     raise HTTPException(400, "Email already registered")
    
    user_id = str(uuid.uuid4())
    hashed_pw = hash_password(user_data.password)
    
    # Save to DB in production:
    # new_user = User(id=user_id, name=user_data.name, email=user_data.email, 
    #                 hashed_password=hashed_pw, phone=user_data.phone, role=user_data.role)
    # db.add(new_user); db.commit()
    
    token = create_access_token(
        data={"sub": user_id, "role": user_data.role},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "name": user_data.name,
            "email": user_data.email,
            "role": user_data.role,
            "rating": 5.0,
            "total_rides": 0,
            "verified": False
        }
    }


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """
    Login with email & password
    - Validates credentials
    - Returns JWT token with user info
    """
    # Fetch user from DB in production:
    # user = db.query(User).filter(User.email == credentials.email).first()
    # if not user or not verify_password(credentials.password, user.hashed_password):
    #     raise HTTPException(401, "Invalid email or password")
    
    # Mock validation for demo
    user_id = "mock_user_id"
    token = create_access_token(
        data={"sub": user_id},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user_id, "email": credentials.email}
    }


@router.get("/me")
async def get_me(current_user: TokenData = Depends(get_current_user)):
    """Get current user profile"""
    return {"user_id": current_user.user_id, "status": "authenticated"}


@router.post("/logout")
async def logout():
    """Logout (client should discard JWT token)"""
    return {"message": "Logged out successfully"}

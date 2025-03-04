from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from pydantic import BaseModel
import os

app = FastAPI()

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "cae03cde6d4ce40433415763eba3269ffc4159e0681b2a8e23a1c038c0e57bbe"  # Change this!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Temporary user storage (replace with database later)
users_db = {}

class UserCreate(BaseModel):
    email: str
    password: str
    firstName: str
    lastName: str

class UserLogin(BaseModel):
    email: str
    password: str

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/api/register")
async def register(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(user.password)
    users_db[user.email] = {
        "email": user.email,
        "hashed_password": hashed_password,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
    
    return {"message": "User created successfully"}

@app.post("/api/login")
async def login(user: UserLogin):
    db_user = users_db.get(user.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not pwd_context.verify(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": db_user["email"],
            "firstName": db_user["firstName"],
            "lastName": db_user["lastName"]
        }
    }


# Basic route example
@app.get("/")
async def root():
    return {"message": "All About Learning API"}

# Example route to get list of documents
@app.get("/api/documents")
async def get_documents():
    # This will be expanded to actually fetch documents
    return {
        "documents": [
            {"id": 1, "name": "Customer Service Basics", "type": "pdf"},
            {"id": 2, "name": "Product Training", "type": "presentation"}
        ]
    } 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
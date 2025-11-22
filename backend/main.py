from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict
from passlib.context import CryptContext

app = FastAPI()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# In-memory "database"
users_db: Dict[str, str] = {}

# Models
class User(BaseModel):
    username: str
    password: str

class UserInDB(User):
    hashed_password: str

# Utility functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Endpoints
@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/register")
def register(user: User):
    print("in register")
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = hash_password(user.password)
    users_db[user.username] = hashed_password
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: User):
    if user.username not in users_db:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    hashed_password = users_db[user.username]
    if not verify_password(user.password, hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    return {"message": "Login successful"}
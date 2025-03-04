from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import List
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
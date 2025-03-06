from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from pydantic import BaseModel
from jose import JWTError
import os
import mysql.connector
from urllib.parse import urlparse
import os
import uuid
from fastapi.responses import FileResponse, RedirectResponse, StreamingResponse
from google_auth_oauthlib.flow import Flow
import io
from drive_service import get_credentials, save_credentials
from googleapiclient.http import MediaIoBaseUpload
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload  # Add this import


app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

CREDENTIALS_PATH = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/drive.file']

ALLOWED_CATEGORIES = {
    'multipoint-locks', 'door-closers', 'hinges', 'sliding-hardware',
    'window-hardware', 'door-hardware', 'weatherstripping', 'thresholds', 'operators'
}

# Create uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
# Create category subdirectories
for category in ALLOWED_CATEGORIES:
    category_dir = os.path.join(UPLOAD_DIR, category)
    if not os.path.exists(category_dir):
        os.makedirs(category_dir)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://weballaboutdoors.github.io",
        "http://localhost:5001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


database_url = os.getenv('JAWSDB_URL', 'mysql://tdyjtyp1rmaitkyh:ew2fh3nb7hpm6vom@b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/eimwrhajiyfl3cqw')
url = urlparse(database_url)

def get_db():
    try:
        connection = mysql.connector.connect(
            host="b4e9xxkxnpu2v96i.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user="tdyjtyp1rmaitkyh",
            password="ew2fh3nb7hpm6vom",
            database="eimwrhajiyfl3cqw",
            port=3306,
            ssl_disabled=False,  # Enable SSL
            ssl_verify_cert=False  # Don't verify SSL cert
        )
        print("Database connection successful")
        return connection
    except mysql.connector.Error as err:
        print(f"Database connection error: {err}")
        raise HTTPException(status_code=500, detail=str(err))

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

class User(BaseModel):  # Add this here
    id: Optional[int] = None
    email: str
    first_name: str
    last_name: str
    is_admin: bool = False

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Debug logging
        print(f"Received token: {token}")
        
        # Clean the token
        if token.startswith('Bearer '):
            token = token.split(' ')[1]
        
        # Remove any whitespace
        token = token.strip()
        
        # Debug logging
        print(f"Cleaned token: {token}")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
            
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        db.close()
        
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
            
        return User(**user)
    except JWTError as e:
        print(f"JWT Error: {str(e)}")  # Debug logging
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")  # Debug logging
        raise HTTPException(status_code=500, detail="Internal server error")



@app.post("/api/admin/create-user")
async def create_user(user: UserCreate, current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        # Check if user exists
        cursor.execute("SELECT email FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = pwd_context.hash(user.password)
        cursor.execute(
            """
            INSERT INTO users (email, password, first_name, last_name) 
            VALUES (%s, %s, %s, %s)
            """,
            (user.email, hashed_password, user.firstName, user.lastName)
        )
        db.commit()
        return {"message": "User created successfully"}
    finally:
        cursor.close()
        db.close()

@app.get("/auth/google")
async def auth_google():
    """Start the Google OAuth flow"""
    try:
        service, auth_url = get_credentials()
        if auth_url:
            return RedirectResponse(url=auth_url)
        return {"message": "Already authenticated"}
    except FileNotFoundError:
        return {"message": "Google Drive not configured"}

@app.get("/oauth2callback")
async def oauth2callback(code: str):
    """Handle the OAuth callback"""
    try:
        flow = Flow.from_client_secrets_file(
            'credentials.json',
            scopes=['https://www.googleapis.com/auth/drive.file'],
            redirect_uri='http://localhost:5001/oauth2callback'
        )
        flow.fetch_token(code=code)
        credentials = flow.credentials
        save_credentials(credentials)
        return {"message": "Authentication successful"}
    except FileNotFoundError:
        return {"message": "Google Drive not configured"}

@app.post("/api/admin/upload-document")
async def upload_document(
    title: str = Form(...),
    description: str = Form(...),
    categoryId: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        # Get Drive service
        service, auth_url = get_credentials()
        if auth_url:
            # Return the auth URL with a specific status code and structure
            raise HTTPException(
                status_code=401,
                detail={
                    "message": "Need to authenticate with Google Drive",
                    "auth_url": auth_url
                }
            )
        
        # Check/Create category folder in Drive
        results = service.files().list(
            q=f"name='{categoryId}' and mimeType='application/vnd.google-apps.folder'",
            spaces='drive'
        ).execute()
        
        if not results['files']:
            folder_metadata = {
                'name': categoryId,
                'mimeType': 'application/vnd.google-apps.folder'
            }
            folder = service.files().create(body=folder_metadata, fields='id').execute()
            folder_id = folder.get('id')
        else:
            folder_id = results['files'][0]['id']
        
        # Upload to Google Drive
        file_content = await file.read()
        media = MediaIoBaseUpload(
            io.BytesIO(file_content),
            mimetype='application/pdf',
            resumable=True
        )
        
        file_metadata = {
            'name': f"{title}.pdf",
            'parents': [folder_id]
        }
        
        uploaded_file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        
        # Save to database using Drive file ID
        db = get_db()
        cursor = db.cursor(dictionary=True)
        
        try:
            cursor.execute(
                """
                INSERT INTO documents 
                (title, description, file_path, category_id, uploaded_by) 
                VALUES (%s, %s, %s, %s, %s)
                """,
                (title, description, uploaded_file['id'], categoryId, current_user.id)
            )
            db.commit()
            print(f"Saved file with Drive ID: {uploaded_file['id']}")  # Debug print
            return {"message": "Document uploaded successfully", "file_id": uploaded_file['id']}
        finally:
            cursor.close()
            db.close()
            
    except Exception as e:
        print(f"Upload error: {str(e)}")
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

# Get documents by category
@app.get("/api/documents/{category_id}")
async def get_documents_by_category(
    category_id: str,
    current_user: User = Depends(get_current_user)
):
    print(f"Fetching documents for category: {category_id}")  # Debug log

    if category_id not in ALLOWED_CATEGORIES:
        print(f"Invalid category requested: {category_id}")  # Debug log
        raise HTTPException(status_code=400, detail="Invalid category")
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute(
            """
            SELECT id, title, description, file_path, created_at 
            FROM documents 
            WHERE category_id = %s 
            ORDER BY created_at DESC
            """,
            (category_id,)
        )
        documents = cursor.fetchall()
        
        return documents
    finally:
        cursor.close()
        db.close()

@app.get("/api/documents/{category_id}/{file_id}/file")
async def get_document_file(
    category_id: str,
    file_id: str,
    current_user: User = Depends(get_current_user)
):
    try:
        # Get Drive service
        service, auth_url = get_credentials()
        if auth_url:
            raise HTTPException(
                status_code=401,
                detail={
                    "message": "Need to authenticate with Google Drive",
                    "auth_url": auth_url
                }
            )

        # Verify the file exists and user has access
        try:
            file = service.files().get(fileId=file_id).execute()
            
            # Get the file content
            request = service.files().get_media(fileId=file_id)
            file_content = io.BytesIO()
            downloader = MediaIoBaseDownload(file_content, request)
            done = False
            while done is False:
                status, done = downloader.next_chunk()

            file_content.seek(0)
            return StreamingResponse(
                file_content, 
                media_type='application/pdf',
                headers={
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Authorization",
                    'Content-Disposition': 'inline; filename="{}"'.format(file["name"]),
                    'Content-Security-Policy': 'default-src \'self\'; object-src \'none\'',
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY'
                }
            )
            
        except Exception as e:
            print(f"Error accessing file: {str(e)}")  # Debug log
            raise HTTPException(status_code=404, detail="File not found")

    except Exception as e:
        print(f"Error in get_document_file: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/admin/documents")
async def get_admin_documents(current_user: User = Depends(get_current_user)):
    print(f"Fetching documents for admin user: {current_user.email}")  # Debug log
    
    if not current_user.is_admin:
        print(f"Non-admin user attempted to access documents: {current_user.email}")  # Debug log
        raise HTTPException(status_code=403, detail="Admin access required")
    
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        
        try:
            cursor.execute("""
                SELECT 
                    d.id,
                    d.title,
                    d.description,
                    d.file_path,
                    d.category_id,
                    d.created_at,
                    u.email as uploaded_by
                FROM documents d
                LEFT JOIN users u ON d.uploaded_by = u.id
                ORDER BY d.created_at DESC
            """)
            documents = cursor.fetchall()
            
            # Convert datetime objects to strings for JSON serialization
            for doc in documents:
                if doc['created_at']:
                    doc['created_at'] = doc['created_at'].isoformat()
            
            print(f"Successfully fetched {len(documents)} documents")  # Debug log
            return documents
            
        finally:
            cursor.close()
            db.close()
            
    except Exception as e:
        print(f"Error fetching documents: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get("/api/admin/users")
async def get_users(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        cursor.execute("""
            SELECT id, email, first_name, last_name, is_admin, created_at 
            FROM users 
            ORDER BY created_at DESC
        """)
        users = cursor.fetchall()
        
        # Convert datetime objects to strings
        for user in users:
            if user['created_at']:
                user['created_at'] = user['created_at'].isoformat()
        
        return users
    finally:
        cursor.close()
        db.close()


@app.delete("/api/admin/documents/{document_id}")
async def delete_document(
    document_id: int,
    current_user: User = Depends(get_current_user)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        # First get the document to check if it exists and get the file path
        cursor.execute("SELECT file_path FROM documents WHERE id = %s", (document_id,))
        document = cursor.fetchone()
        
        if not document:
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete the file from storage
        if os.path.exists(document['file_path']):
            os.remove(document['file_path'])
        
        # Delete from database
        cursor.execute("DELETE FROM documents WHERE id = %s", (document_id,))
        db.commit()
        
        return {"message": "Document deleted successfully"}
    finally:
        cursor.close()
        db.close()


@app.post("/api/register")
async def register(user: UserCreate):
    print(f"Registration attempt for: {user.email}")  # Debug log
    db = get_db()
    cursor = db.cursor()
    
    try:
        # Check if user exists
        cursor.execute("SELECT email FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            print(f"Email already exists: {user.email}")  # Debug log
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = pwd_context.hash(user.password)
        cursor.execute(
            "INSERT INTO users (email, password, first_name, last_name) VALUES (%s, %s, %s, %s)",
            (user.email, hashed_password, user.firstName, user.lastName)
        )
        db.commit()  # Make sure we commit the transaction
        print(f"User registered successfully: {user.email}")  # Debug log
        return {"message": "User created successfully"}
    except Exception as e:
        print(f"Error registering user: {str(e)}")  # Debug log
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        db.close()

@app.post("/api/login")
async def login(user: UserLogin):
    print(f"Login attempt for: {user.email}")  # Debug log
    
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    try:
        # Get user from database
        cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
        db_user = cursor.fetchone()
        
        if not db_user:
            print(f"User not found: {user.email}")
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        if not pwd_context.verify(user.password, db_user['password']):
            print(f"Invalid password for: {user.email}")
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        access_token = create_access_token(data={"sub": user.email})
        print(f"Login successful for: {user.email}")
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "email": db_user['email'],
                "firstName": db_user['first_name'],
                "lastName": db_user['last_name'],
                "is_admin": bool(db_user['is_admin'])  # Add this line
            }
        }
    finally:
        cursor.close()
        db.close()

@app.get("/api/test-drive")
async def test_drive_upload():
    service, auth_url = get_credentials()
    if auth_url:
        return {"error": "Need to authenticate first"}
    
    try:
        # Create a test folder
        folder_metadata = {
            'name': 'Test Folder',
            'mimeType': 'application/vnd.google-apps.folder'
        }
        
        folder = service.files().create(
            body=folder_metadata,
            fields='id'
        ).execute()
        
        # Create a test file
        file_metadata = {
            'name': 'test.txt',
            'parents': [folder.get('id')]
        }
        
        content = "This is a test file"
        media = MediaIoBaseUpload(
            io.BytesIO(content.encode()),
            mimetype='text/plain',
            resumable=True
        )
        
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()
        
        return {
            "message": "Test successful",
            "folder_id": folder.get('id'),
            "file_id": file.get('id')
        }
        
    except Exception as e:
        return {"error": str(e)}





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
    uvicorn.run(app, host="0.0.0.0", port=5001)
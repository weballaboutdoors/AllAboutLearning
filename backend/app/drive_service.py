from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
import os
import json

SCOPES = ['https://www.googleapis.com/auth/drive.file']
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_PATH = os.path.join(BASE_DIR, 'credentials.json')

def get_credentials():
    creds = None
    # Load credentials from file if it exists
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        # Load client secrets
        flow = Flow.from_client_secrets_file(
            CREDENTIALS_PATH,  # Changed from 'credentials.json'
            scopes=SCOPES,
            redirect_uri='http://localhost:5001/oauth2callback'
        )
        auth_url, _ = flow.authorization_url(prompt='consent')
        print(f"Please go to this URL to authorize: {auth_url}")
        
        return None, auth_url
    
    return build('drive', 'v3', credentials=creds), None
def save_credentials(credentials):
    # Save the credentials for future use
    with open('token.json', 'w') as token:
        token.write(credentials.to_json())
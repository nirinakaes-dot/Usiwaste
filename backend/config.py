import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """App configuration — set these via Render env vars or .env file."""
    SECRET_KEY = os.environ.get("SECRET_KEY", "change-me")
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "sqlite:///usiwaste.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

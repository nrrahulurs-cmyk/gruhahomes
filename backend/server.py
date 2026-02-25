from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    service: Optional[str] = ""
    message: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    subscribed_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class NewsletterCreate(BaseModel):
    email: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Gruha Homes API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact(input: ContactCreate):
    submission = ContactSubmission(**input.model_dump())
    doc = submission.model_dump()
    await db.contacts.insert_one(doc)
    doc.pop("_id", None)
    return submission

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": input.email}, {"_id": 0})
    if existing:
        return NewsletterSubscription(**existing)
    subscription = NewsletterSubscription(**input.model_dump())
    doc = subscription.model_dump()
    await db.newsletter.insert_one(doc)
    doc.pop("_id", None)
    return subscription

@api_router.get("/newsletter", response_model=List[NewsletterSubscription])
async def get_newsletter_subs():
    subs = await db.newsletter.find({}, {"_id": 0}).to_list(1000)
    return subs

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

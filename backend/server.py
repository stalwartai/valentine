from fastapi import FastAPI, APIRouter, HTTPException
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
import google.generativeai as genai
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

gemini_api_key = os.environ.get('GEMINI_API_KEY')
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class GiftIdeaRequest(BaseModel):
    giver_name: str
    recipient_name: str
    budget: str
    about_them: str
    special_memory: str
    giver_gift_idea: str
    why_meaningful: str

class GiftIdea(BaseModel):
    title: str
    description: str
    why_it_works: str
    personalization_tip: str
    estimated_cost: str
    category: str

class BundleItem(BaseModel):
    item: str
    cost: str
    where: str

class Bundle(BaseModel):
    bundle_name: str
    items_list: List[BundleItem]
    total_cost: str
    presentation_tips: str
    note_template: str
    pro_tip: str

class GiftResponse(BaseModel):
    gifts: List[GiftIdea]
    bundle: Optional[Bundle] = None


@api_router.get("/")
async def root():
    return {"message": "Valentine's Gift AI API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/generate-gifts", response_model=GiftResponse)
async def generate_gifts(request: GiftIdeaRequest):
    try:
        system_prompt = """You're helping someone find a meaningful gift for someone they care about.

Talk naturally, like a friend who's good at gift ideas. Don't be overly poetic or formal.

What matters:
- Understand what makes their relationship special
- Suggest gifts that feel personal, not generic
- Be practical - tell them exactly what to get and where
- Keep it real and conversational

For each gift:
- title: Simple, clear name (5-6 words max)
- description: What it actually is (20-30 words, plain language)
- why_it_works: Why this fits THEM specifically (2-3 sentences, natural tone)
- personalization_tip: One specific thing they can do to make it extra special
- estimated_cost: Like "₹1,500" or "₹800-1,200" 
- category: thoughtful/creative/experiential/practical/romantic

For the bundle, items_list MUST be an array of objects with this exact structure:
[{"item": "item name", "cost": "₹500", "where": "where to buy"}]

Return only valid JSON. Keep language simple and friendly."""

        user_prompt = f"""About this gift:

Who it's for: {request.recipient_name}
From: {request.giver_name}
Budget: ₹{request.budget}

About {request.recipient_name}:
{request.about_them}

A memory that matters:
{request.special_memory}

{request.giver_name}'s original gift idea: {request.giver_gift_idea}
Why they thought of this: {request.why_meaningful}

---

What I need:

1. Take {request.giver_name}'s idea ("{request.giver_gift_idea}") and make it better - add details, make it more special

2. Come up with 3 completely different gift ideas that:
   - Connect to what makes their relationship unique
   - Aren't obvious (surprise them with how well you got it)
   - Cost around ₹{request.budget} or less
   - Are actually available in India

3. Create a complete gift bundle idea (combining 3-5 small items)

IMPORTANT about the JSON:
- items_list in bundle MUST be an array of objects like: [{{"item": "name", "cost": "₹500", "where": "shop name"}}]
- NOT strings, actual JSON objects

Return JSON: {{"gifts": [4 gifts], "bundle": {{"bundle_name": "...", "items_list": [...], ...}}}}

Keep it natural and helpful, not overly fancy."""

        model = genai.GenerativeModel('gemini-3-flash-preview')
        response = model.generate_content(f"{system_prompt}\n\n{user_prompt}")
        
        response_text = response.text.strip()
        
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        
        response_text = response_text.strip()
        
        result = json.loads(response_text)
        
        if 'gifts' not in result or not isinstance(result['gifts'], list):
            raise ValueError("Invalid response structure: missing 'gifts' array")
        
        return GiftResponse(**result)
        
    except json.JSONDecodeError as e:
        logging.error(f"JSON parsing error: {e}")
        logging.error(f"Response text: {response_text}")
        raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")
    except Exception as e:
        logging.error(f"Error generating gifts: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate gift ideas: {str(e)}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

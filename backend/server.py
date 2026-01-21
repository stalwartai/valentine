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

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Configure Gemini
gemini_api_key = os.environ.get('GEMINI_API_KEY')
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Gift Generation Models
class GiftIdeaRequest(BaseModel):
    giver_name: str
    recipient_name: str
    budget: str
    hobbies: str
    interests: str
    favorites: str
    personality: str
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


# Add your routes to the router instead of directly to app
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
        # Build system prompt
        system_prompt = """You are "GiftSense", an expert gift advisor specializing in thoughtful, personalized romantic gifts.

Your task: Generate gift concepts tailored to the recipient's personality, interests, and relationship context.

For each gift, provide:
1. title (clear, 5-6 words max)
2. description (what it is, 20-30 words)
3. why_it_works (2-3 sentences connecting to their personality/interests/memories)
4. personalization_tip (1 sentence on how to customize)
5. estimated_cost (within budget, in INR)
6. category (thoughtful/creative/experiential/practical/romantic)

Guidelines:
- Gifts must be obtainable in India
- Stay within budget
- Avoid generic suggestions
- Connect to unique traits
- Make actionable (user knows where/how to get it)
- Tone: warm, sincere, encouraging

Return as valid JSON only, no markdown formatting."""

        # Build user prompt
        user_prompt = f"""Context:
Giver: {request.giver_name}
Recipient: {request.recipient_name}
Budget: {request.budget}
Hobbies: {request.hobbies}
Interests: {request.interests}
Favorites: {request.favorites}
Personality: {request.personality}
Special Memory: {request.special_memory}
Giver's Gift Idea: {request.giver_gift_idea}
Why Meaningful: {request.why_meaningful}

Task:
1. Reformat the giver's original idea ("{request.giver_gift_idea}") into proper JSON structure with enhanced description and reasoning based on why they chose it.

2. Generate 3 NEW alternative gift ideas that:
   - Fit budget: {request.budget}
   - Match personality: {request.personality}
   - Connect to interests/hobbies
   - Feel personal and thoughtful
   - Are DIFFERENT from giver's idea but complementary
   - Are available in India

For ALL 4 gifts (1 reformatted + 3 new), return JSON array with:
- title
- description
- why_it_works
- personalization_tip
- estimated_cost
- category

Additionally, create 1 curated gift bundle/hamper that combines 3-5 compatible items into a complete experience.

Include:
- bundle_name (creative, specific)
- items_list (array of 3-5 items with item, cost, where fields)
- total_cost
- presentation_tips (how to package/arrange)
- note_template (sample message user can personalize)
- pro_tip (one extra touch)

Return this as JSON with structure: {{"gifts": [...], "bundle": {{...}}}}

Make each gift distinct and meaningful. Return ONLY valid JSON, no markdown."""

        # Call Gemini API
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"{system_prompt}\n\n{user_prompt}")
        
        # Parse response
        response_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.startswith('```'):
            response_text = response_text[3:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        
        response_text = response_text.strip()
        
        # Parse JSON
        result = json.loads(response_text)
        
        # Validate structure
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


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

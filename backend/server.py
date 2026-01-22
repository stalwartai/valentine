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
        system_prompt = """You are an expert gift advisor who creates deeply meaningful, emotionally resonant gift ideas.

Your specialty: Understanding the emotional core of relationships and translating memories into tangible gifts.

CRITICAL RULES:
1. DO NOT simply restate what the user described - be CREATIVE and INSIGHTFUL
2. DO NOT copy their words - interpret the deeper meaning and feelings
3. Each gift must feel like a revelation, not a summary
4. Focus on the EMOTIONAL IMPACT and memories, not just interests
5. Gifts should surprise them with how well you understood their connection

For each gift provide:
- title: Creative, evocative (5-6 words)
- description: What it is physically (20-30 words)
- why_it_works: Deep emotional reasoning connecting to their story (2-3 sentences)
- personalization_tip: Specific action to make it more meaningful (1 sentence)
- estimated_cost: String format like "₹1,500" or "₹800-1,200"
- category: thoughtful/creative/experiential/practical/romantic

Return valid JSON only. All values must be strings."""

        user_prompt = f"""RELATIONSHIP CONTEXT:
Giver: {request.giver_name}
Recipient: {request.recipient_name}
Budget: ₹{request.budget}

WHO THEY ARE:
{request.about_them}

A SPECIAL MEMORY:
{request.special_memory}

GIVER'S ORIGINAL IDEA:
"{request.giver_gift_idea}"

WHY IT MATTERS TO THEM:
{request.why_meaningful}

---

TASK:
1. First, deeply understand the EMOTIONAL CORE of their relationship from the memory and context
2. Reinterpret the giver's idea with enhanced emotional depth (don't just repeat it)
3. Generate 3 COMPLETELY DIFFERENT gift alternatives that:
   - Connect to the deeper feelings in their story
   - Are NOT obvious extensions of what they mentioned
   - Show you understood what they didn't explicitly say
   - Feel surprising yet perfect
   - Stay within budget: ₹{request.budget}
   - Are available in India

IMPORTANT:
- DO NOT use phrases like "as mentioned" or "they said"
- DO NOT list their interests back to them
- INTERPRET the feelings, don't summarize the facts
- Each gift should feel like you read between the lines

Also create ONE curated gift bundle combining 3-5 items into a complete emotional experience.

Bundle structure:
- bundle_name: Evocative name
- items_list: Array with item, cost, where (all strings)
- total_cost: String like "₹2,500"
- presentation_tips: How to arrange/present
- note_template: Heartfelt message they can personalize
- pro_tip: One meaningful extra touch

Return JSON: {{"gifts": [4 gifts], "bundle": {{...}}}}

Be creative. Be insightful. Don't be repetitive."""

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

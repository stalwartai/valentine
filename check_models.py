import google.generativeai as genai
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent / 'backend'
load_dotenv(ROOT_DIR / '.env')

# Configure Gemini
gemini_api_key = os.environ.get('GEMINI_API_KEY')
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
    print(f"✅ API Key configured: {gemini_api_key[:10]}...")
    
    try:
        print("\n📋 Available Gemini Models:")
        models = genai.list_models()
        for model in models:
            print(f"   - {model.name}")
            if hasattr(model, 'supported_generation_methods'):
                print(f"     Methods: {model.supported_generation_methods}")
    except Exception as e:
        print(f"❌ Error listing models: {e}")
else:
    print("❌ No API key found")
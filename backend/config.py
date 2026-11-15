import os
from dotenv import load_dotenv

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
COHERE_MODEL = "command-a-plus-05-2026"

CONTEXT_AGENT_API_KEY = os.getenv("CONTEXT_AGENT_API_KEY")
HANDOFF_AGENT_API_KEY = os.getenv("HANDOFF_AGENT_API_KEY")
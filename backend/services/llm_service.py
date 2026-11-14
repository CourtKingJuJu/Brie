import json

import cohere

from config import COHERE_API_KEY, COHERE_MODEL, CONTEXT_AGENT_API_KEY
from gateway.auth import authenticate_agent
from gateway.permissions import authorize_tool
from gateway.tools import patient_context_tool
from gateway.schemas import ContextResponse


co = cohere.ClientV2(api_key=COHERE_API_KEY)


def generate_context(patient_id: int, purpose: str):

    # Identify the agent
    agent = authenticate_agent(
        "context_agent",
        CONTEXT_AGENT_API_KEY,
    )

    # Verify that this agent is allowed to use the required tool
    authorize_tool(
        agent["agent_id"],
        "get_patient_context",
    )

    # Retrieve the approved EHR data
    patient_data = patient_context_tool(patient_id)

    if not patient_data:
        return None

    # Load the agent prompt
    with open("prompts/context_agent.txt", "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.replace(
        "{patient_data}",
        json.dumps(patient_data, indent=2),
    )

    # Ask the model to synthesize the context
    response = co.chat(
        model=COHERE_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    response_text = None

    for content_item in response.message.content:
        if content_item.type == "text":
            response_text = content_item.text
            break

    if not response_text:
        raise ValueError("No text response returned from Cohere.")

    response_data = json.loads(response_text)

    # Validate the model output against our schema
    return ContextResponse.model_validate(response_data)
import json
import cohere

from config import COHERE_API_KEY, COHERE_MODEL
from gateway.tools import patient_context_tool
from gateway.schemas import ContextResponse


co = cohere.ClientV2(api_key=COHERE_API_KEY)


def generate_context(patient_id: int):

    patient_data = patient_context_tool(patient_id)

    if not patient_data:
        return None

    with open("prompts/context_agent.txt", "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.replace(
        "{patient_data}",
        json.dumps(patient_data, indent=2)
    )

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

    return ContextResponse.model_validate(response_data)
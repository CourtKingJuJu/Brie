import cohere

from config import COHERE_API_KEY, COHERE_MODEL
from gateway.tools import patient_context_tool


co = cohere.ClientV2(api_key=COHERE_API_KEY)


def generate_context(patient_id: int):

    patient_data = patient_context_tool(patient_id)

    if not patient_data:
        return "Patient not found."

    with open("prompts/context_agent.txt", "r") as file:
        prompt_template = file.read()

    prompt = prompt_template.replace(
        "{patient_data}",
        str(patient_data)
    )
    print(prompt)
    response = co.chat(
        model=COHERE_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    for content_item in response.message.content:
        if content_item.type == "text":
            return content_item.text

    return "No text response was returned."
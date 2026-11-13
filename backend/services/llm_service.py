import cohere

from config import COHERE_API_KEY, COHERE_MODEL


co = cohere.ClientV2(api_key=COHERE_API_KEY)


def test_model():
    response = co.chat(
        model=COHERE_MODEL,
        messages=[
            {
                "role": "user",
                "content": "In one sentence, explain what a hospital EHR is.",
            }
        ],
    )

    for content_item in response.message.content:
        if content_item.type == "text":
            return content_item.text

    return "No text response was returned."
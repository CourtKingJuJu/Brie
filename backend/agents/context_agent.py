import json

import cohere

from config import COHERE_API_KEY, COHERE_MODEL, CONTEXT_AGENT_API_KEY
from gateway.auth import authenticate_agent
from gateway.permissions import authorize_tool
from gateway.tools import patient_context_tool
from gateway.schemas import ContextResponse
from utils.logger import logger


class ContextAgent:

    def __init__(self):
        self.agent_id = "context_agent"
        self.api_key = CONTEXT_AGENT_API_KEY
        self.co = cohere.ClientV2(api_key=COHERE_API_KEY)

    def generate(self, patient_id: int, purpose: str):

        logger.info(
            f"AGENT | starting context generation "
            f"| agent={self.agent_id} "
            f"| patient_id={patient_id} "
            f"| purpose={purpose}"
        )

        # Authenticate the agent
        agent = authenticate_agent(
            self.agent_id,
            self.api_key,
        )

        # Verify tool permission
        authorize_tool(
            agent["agent_id"],
            "get_patient_context",
        )

        # Retrieve approved EHR data
        logger.info(
            f"TOOL | agent={agent['agent_id']} "
            f"| tool=get_patient_context "
            f"| patient_id={patient_id} "
            f"| status=starting"
        )

        try:
            patient_data = patient_context_tool(patient_id)

            logger.info(
                f"TOOL | agent={agent['agent_id']} "
                f"| tool=get_patient_context "
                f"| patient_id={patient_id} "
                f"| status=success"
            )

        except Exception as error:
            logger.error(
                f"TOOL | agent={agent['agent_id']} "
                f"| tool=get_patient_context "
                f"| patient_id={patient_id} "
                f"| status=failure "
                f"| error={error}"
            )
            raise

        if not patient_data:
            logger.warning(
                f"AGENT | agent={self.agent_id} "
                f"| patient_id={patient_id} "
                f"| no_patient_data"
            )
            return None

        # Load prompt
        with open("prompts/context_agent.txt", "r") as file:
            prompt_template = file.read()

        prompt = prompt_template.replace(
            "{patient_data}",
            json.dumps(patient_data, indent=2),
        )

        # LLM generation
        logger.info(
            f"LLM | agent={agent['agent_id']} "
            f"| model={COHERE_MODEL} "
            f"| status=starting"
        )

        try:
            response = self.co.chat(
                model=COHERE_MODEL,
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )

            logger.info(
                f"LLM | agent={agent['agent_id']} "
                f"| model={COHERE_MODEL} "
                f"| status=success"
            )

        except Exception as error:
            logger.error(
                f"LLM | agent={agent['agent_id']} "
                f"| model={COHERE_MODEL} "
                f"| status=failure "
                f"| error={error}"
            )
            raise

        response_text = None

        for content_item in response.message.content:
            if content_item.type == "text":
                response_text = content_item.text
                break

        if not response_text:
            logger.error(
                f"OUTPUT | agent={self.agent_id} "
                f"| patient_id={patient_id} "
                f"| status=failure "
                f"| reason=no_text_response"
            )
            raise ValueError("No text response returned from Cohere.")

        # Parse and validate model output
        logger.info(
            f"OUTPUT | agent={self.agent_id} "
            f"| patient_id={patient_id} "
            f"| validation=starting"
        )

        try:
            response_data = json.loads(response_text)

            validated_response = ContextResponse.model_validate(
                response_data
            )

        except Exception as error:
            logger.error(
                f"OUTPUT | agent={self.agent_id} "
                f"| patient_id={patient_id} "
                f"| validation=failure "
                f"| error={error}"
            )
            raise

        logger.info(
            f"OUTPUT | agent={self.agent_id} "
            f"| patient_id={patient_id} "
            f"| validation=success"
        )

        logger.info(
            f"AGENT | agent={self.agent_id} "
            f"| patient_id={patient_id} "
            f"| context_generation=complete"
        )

        return validated_response
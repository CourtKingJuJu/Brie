import json

import cohere

from config import (
    COHERE_API_KEY,
    COHERE_MODEL,
    HANDOFF_AGENT_API_KEY,
)
from gateway.auth import authenticate_agent
from gateway.permissions import authorize_tool
from gateway.schemas import HandoffResponse
from gateway.tools import assigned_patients_tool
from utils.logger import logger


class HandoffAgent:

    def __init__(self, context_agent):
        self.agent_id = "handoff_agent"
        self.api_key = HANDOFF_AGENT_API_KEY
        self.co = cohere.ClientV2(api_key=COHERE_API_KEY)

        # Agent-to-agent delegation
        self.context_agent = context_agent

    def generate(self, nurse_id: int, purpose: str):

        logger.info(
            f"AGENT | starting handoff generation "
            f"| agent={self.agent_id} "
            f"| nurse_id={nurse_id} "
            f"| purpose={purpose}"
        )

        # Authenticate Handoff Agent
        agent = authenticate_agent(
            self.agent_id,
            self.api_key,
        )

        # Verify assignment access
        authorize_tool(
            agent["agent_id"],
            "get_assigned_patients",
        )

        logger.info(
            f"TOOL | agent={agent['agent_id']} "
            f"| tool=get_assigned_patients "
            f"| nurse_id={nurse_id} "
            f"| status=starting"
        )

        try:
            assignments = assigned_patients_tool(nurse_id)

            logger.info(
                f"TOOL | agent={agent['agent_id']} "
                f"| tool=get_assigned_patients "
                f"| nurse_id={nurse_id} "
                f"| status=success"
            )

        except Exception as error:
            logger.error(
                f"TOOL | agent={agent['agent_id']} "
                f"| tool=get_assigned_patients "
                f"| nurse_id={nurse_id} "
                f"| status=failure "
                f"| error={error}"
            )
            raise

        if not assignments:
            logger.warning(
                f"AGENT | agent={self.agent_id} "
                f"| nurse_id={nurse_id} "
                f"| no_assignments"
            )

            return HandoffResponse(
                shift_summary="No patients are currently assigned to this nurse.",
                patients=[],
            )

        # Delegate each patient to the Context Agent
        patient_contexts = []

        authorize_tool(
            agent["agent_id"],
            "delegate_to_context_agent",
        )

        for assignment in assignments:

            patient_id = assignment["patient_id"]

            logger.info(
                f"DELEGATION | from={self.agent_id} "
                f"| to=context_agent "
                f"| patient_id={patient_id} "
                f"| status=starting"
            )

            try:
                context = self.context_agent.generate(
                    patient_id,
                    purpose="shift_handoff",
                )

                if context is None:
                    logger.warning(
                        f"DELEGATION | from={self.agent_id} "
                        f"| to=context_agent "
                        f"| patient_id={patient_id} "
                        f"| status=no_context"
                    )
                    continue

                patient_contexts.append(
                    {
                        "patient_id": patient_id,
                        "context": context.model_dump(),
                    }
                )

                logger.info(
                    f"DELEGATION | from={self.agent_id} "
                    f"| to=context_agent "
                    f"| patient_id={patient_id} "
                    f"| status=success"
                )

            except Exception as error:
                logger.error(
                    f"DELEGATION | from={self.agent_id} "
                    f"| to=context_agent "
                    f"| patient_id={patient_id} "
                    f"| status=failure "
                    f"| error={error}"
                )

                raise

        if not patient_contexts:
            raise ValueError(
                "Handoff Agent could not obtain context for any assigned patients."
            )

        # Load handoff prompt
        with open("prompts/handoff_agent.txt", "r") as file:
            prompt_template = file.read()

        prompt = prompt_template.replace(
            "{patient_contexts}",
            json.dumps(patient_contexts, indent=2),
        )

        # Generate final handoff
        logger.info(
            f"LLM | agent={self.agent_id} "
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
                f"LLM | agent={self.agent_id} "
                f"| model={COHERE_MODEL} "
                f"| status=success"
            )

        except Exception as error:
            logger.error(
                f"LLM | agent={self.agent_id} "
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
                f"| status=failure "
                f"| reason=no_text_response"
            )

            raise ValueError(
                "No text response returned from Cohere."
            )

        # Validate output
        logger.info(
            f"OUTPUT | agent={self.agent_id} "
            f"| validation=starting"
        )

        try:
            response_data = json.loads(response_text)

            validated_response = HandoffResponse.model_validate(
                response_data
            )

        except Exception as error:
            logger.error(
                f"OUTPUT | agent={self.agent_id} "
                f"| validation=failure "
                f"| error={error}"
            )
            raise

        logger.info(
            f"OUTPUT | agent={self.agent_id} "
            f"| validation=success"
        )

        logger.info(
            f"AGENT | agent={self.agent_id} "
            f"| nurse_id={nurse_id} "
            f"| handoff_generation=complete"
        )

        return validated_response
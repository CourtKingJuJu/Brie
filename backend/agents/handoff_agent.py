import cohere

from config import COHERE_API_KEY, COHERE_MODEL, HANDOFF_AGENT_API_KEY
from gateway.auth import authenticate_agent
from utils.logger import logger


class HandoffAgent:

    def __init__(self, context_agent):
        self.agent_id = "handoff_agent"
        self.api_key = HANDOFF_AGENT_API_KEY
        self.co = cohere.ClientV2(api_key=COHERE_API_KEY)

        # Agent-to-agent delegation
        self.context_agent = context_agent

    def generate(self, nurse_id: int):

        logger.info(
            f"AGENT | starting handoff generation "
            f"| agent={self.agent_id} "
            f"| nurse_id={nurse_id}"
        )

        # Authenticate the Handoff Agent
        agent = authenticate_agent(
            self.agent_id,
            self.api_key,
        )

        logger.info(
            f"AGENT | agent={agent['agent_id']} "
            f"| handoff_generation=starting"
        )

        # Handoff logic will go here

        raise NotImplementedError
from fastapi import HTTPException

from config import (
    CONTEXT_AGENT_API_KEY,
    HANDOFF_AGENT_API_KEY,
)
from utils.logger import logger


AGENT_CREDENTIALS = {
    "context_agent": CONTEXT_AGENT_API_KEY,
    "handoff_agent": HANDOFF_AGENT_API_KEY,
}


def authenticate_agent(agent_id: str, agent_key: str):

    logger.info(
        f"AUTH | agent={agent_id}"
    )

    expected_key = AGENT_CREDENTIALS.get(agent_id)

    if expected_key is None:
        logger.warning(
            f"AUTH | agent={agent_id} "
            f"| status=failure "
            f"| reason=unknown_agent"
        )

        raise HTTPException(
            status_code=401,
            detail="Unknown agent.",
        )

    if agent_key != expected_key:
        logger.warning(
            f"AUTH | agent={agent_id} "
            f"| status=failure "
            f"| reason=invalid_credentials"
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid agent credentials.",
        )

    logger.info(
        f"AUTH | agent={agent_id} "
        f"| status=success"
    )

    return {
        "agent_id": agent_id,
    }
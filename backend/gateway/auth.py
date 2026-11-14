# This file is responsible for identifying the agent
from fastapi import HTTPException

from config import CONTEXT_AGENT_API_KEY
from utils.logger import logger


def authenticate_agent(agent_id: str, agent_key: str):

    logger.info(
        f"AUTH | agent={agent_id}"
    )

    if agent_id != "context_agent":
        logger.warning(
            f"AUTH | agent={agent_id} | status=failure | reason=unknown_agent"
        )

        raise HTTPException(
            status_code=401,
            detail="Unknown agent.",
        )

    if agent_key != CONTEXT_AGENT_API_KEY:
        logger.warning(
            f"AUTH | agent={agent_id} | status=failure | reason=invalid_credentials"
        )

        raise HTTPException(
            status_code=401,
            detail="Invalid agent credentials.",
        )

    logger.info(
        f"AUTH | agent={agent_id} | status=success"
    )

    return {
        "agent_id": agent_id,
    }
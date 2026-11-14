# This file is responsible for saying what the agent is allowed to do
from fastapi import HTTPException

from utils.logger import logger


AGENT_PERMISSIONS = {
    "context_agent": {
        "get_patient_context",
    },
}


def authorize_tool(agent_id: str, tool_name: str):

    logger.info(
        f"PERMISSION | agent={agent_id} | tool={tool_name}"
    )

    allowed_tools = AGENT_PERMISSIONS.get(agent_id, set())

    if tool_name not in allowed_tools:

        logger.warning(
            f"PERMISSION | agent={agent_id} "
            f"| tool={tool_name} "
            f"| status=denied"
        )

        raise HTTPException(
            status_code=403,
            detail=f"Agent '{agent_id}' is not authorized to use '{tool_name}'.",
        )

    logger.info(
        f"PERMISSION | agent={agent_id} "
        f"| tool={tool_name} "
        f"| status=authorized"
    )
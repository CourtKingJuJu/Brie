# This file is responsible for saying what the agent is allowed to do

from fastapi import HTTPException


AGENT_PERMISSIONS = {
    "context_agent": {
        "get_patient_context",
    },
}


def authorize_tool(agent_id: str, tool_name: str):
    allowed_tools = AGENT_PERMISSIONS.get(agent_id, set())

    if tool_name not in allowed_tools:
        raise HTTPException(
            status_code=403,
            detail=f"Agent '{agent_id}' is not authorized to use '{tool_name}'.",
        )
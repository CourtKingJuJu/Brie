# This file is responsible for identifying the agent

from fastapi import Header, HTTPException

from config import CONTEXT_AGENT_API_KEY


def authenticate_agent(
    x_agent_id: str | None = Header(default=None),
    x_agent_key: str | None = Header(default=None),
):
    if not x_agent_id or not x_agent_key:
        raise HTTPException(
            status_code=401,
            detail="Missing agent authentication credentials.",
        )

    if x_agent_id != "context_agent":
        raise HTTPException(
            status_code=401,
            detail="Unknown agent.",
        )

    if x_agent_key != CONTEXT_AGENT_API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid agent credentials.",
        )

    return {
        "agent_id": x_agent_id,
    }
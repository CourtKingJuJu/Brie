from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agents.context_agent import ContextAgent
from agents.handoff_agent import HandoffAgent
from backend.agents import handoff_agent
from gateway.schemas import (
    ContextResponse,
    ContextRequest,
    HandoffResponse,
    HandoffRequest,
)
from utils.logger import logger


app = FastAPI(
    title="HospitalEHR Agent Gateway",
    description="Controlled gateway between AI agents and the Hospital EHR",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Initialize agents
handoff_agent = HandoffAgent()
context_agent = ContextAgent()


@app.get("/")
def root():
    return {
        "message": "HospitalEHR Agent Gateway is running"
    }


@app.post("/api/context", response_model=ContextResponse)
def patient_context(request: ContextRequest):

    logger.info(
        f"REQUEST | patient_id={request.patient_id} "
        f"| purpose={request.purpose}"
    )

    try:
        result = context_agent.generate(
            request.patient_id,
            request.purpose,
        )

        logger.info(
            f"COMPLETE | patient_id={request.patient_id} | status=success"
        )

        return result

    except Exception as error:
        logger.error(
            f"ERROR | patient_id={request.patient_id} "
            f"| type={type(error).__name__} "
            f"| message={error}"
        )

        raise

@app.post("/api/handoff", response_model=HandoffResponse)
def handoff(request: HandoffRequest):

    logger.info(
        f"REQUEST | agent=handoff_agent "
        f"| nurse_id={request.nurse_id} "
        f"| purpose={request.purpose}"
    )

    try:
        result = handoff_agent.generate(
            request.nurse_id,
            request.purpose,
        )

        logger.info(
            f"COMPLETE | agent=handoff_agent "
            f"| nurse_id={request.nurse_id} "
            f"| status=success"
        )

        return result

    except Exception as error:
        logger.error(
            f"ERROR | agent=handoff_agent "
            f"| nurse_id={request.nurse_id} "
            f"| type={type(error).__name__} "
            f"| message={error}"
        )

        raise
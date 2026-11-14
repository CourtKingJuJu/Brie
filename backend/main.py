from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.llm_service import generate_context
from gateway.schemas import ContextResponse, ContextRequest
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
        result = generate_context(
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
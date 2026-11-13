from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

from gateway.auth import authenticate_agent
from gateway.permissions import authorize_tool
from services.llm_service import generate_context
from gateway.schemas import ContextResponse


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


@app.get("/api/context/{patient_id}", response_model=ContextResponse)
def patient_context(
    patient_id: int,
    agent: dict = Depends(authenticate_agent),
):
    authorize_tool(
        agent["agent_id"],
        "get_patient_context",
    )

    return generate_context(patient_id)
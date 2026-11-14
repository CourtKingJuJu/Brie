from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.llm_service import generate_context
from gateway.schemas import ContextResponse, ContextRequest


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
    return generate_context(
        request.patient_id,
        request.purpose,
    )
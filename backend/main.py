from fastapi import FastAPI
from pydantic import BaseModel


# Data comes directly for the DB not the frontend
app = FastAPI(
    title="HospitalEHR Agent Gateway",
    description="Controlled gateway between AI agents and the Hospital EHR",
    version="0.1.0",
)

class GatewayRequest(BaseModel):
    agent_id: str
    action: str
    patient_id: int

    
@app.get("/")
def root():
    return {"message": "HospitalEHR Agent Gateway is running"}

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.post("/gateway")
def gateway(request: GatewayRequest):
    return {
        "message": "Gateway request received",
        "agent_id": request.agent_id,
        "action": request.action,
        "patient_id": request.patient_id,
    }
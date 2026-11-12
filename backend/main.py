from fastapi import FastAPI

from gateway.tools import (
    patient_tool,
    observations_tool,
    medications_tool,
    active_orders_tool,
    recent_notes_tool,
)


app = FastAPI(
    title="HospitalEHR Agent Gateway",
    description="Controlled gateway between AI agents and the Hospital EHR",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "HospitalEHR Agent Gateway is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/tools/patient/{patient_id}")
def patient(patient_id: int):
    return patient_tool(patient_id)


@app.get("/tools/observations/{patient_id}")
def observations(patient_id: int):
    return observations_tool(patient_id)


@app.get("/tools/medications/{patient_id}")
def medications(patient_id: int):
    return medications_tool(patient_id)


@app.get("/tools/orders/{patient_id}")
def active_orders(patient_id: int):
    return active_orders_tool(patient_id)


@app.get("/tools/notes/{patient_id}")
def recent_notes(patient_id: int):
    return recent_notes_tool(patient_id)
# Defines what the agents are allowed to ask for and how the data is structured 
from services.ehr_service import (
    get_patient,
    get_recent_observations,
    get_medications,
    get_active_orders,
    get_recent_notes,
)


def patient_tool(patient_id: int):
    return get_patient(patient_id)


def observations_tool(patient_id: int):
    return get_recent_observations(patient_id)


def medications_tool(patient_id: int):
    return get_medications(patient_id)


def active_orders_tool(patient_id: int):
    return get_active_orders(patient_id)


def recent_notes_tool(patient_id: int):
    return get_recent_notes(patient_id)
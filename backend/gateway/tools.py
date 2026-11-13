# Defines what agents are allowed to ask for
# and how EHR data is structured before reaching the model.

from datetime import date

from services.ehr_service import (
    get_patient,
    get_recent_observations,
    get_medications,
    get_active_orders,
    get_recent_notes,
)


def calculate_age(date_of_birth: str) -> int:
    birth_date = date.fromisoformat(date_of_birth)
    today = date.today()

    age = today.year - birth_date.year

    if (today.month, today.day) < (birth_date.month, birth_date.day):
        age -= 1

    return age


def patient_tool(patient_id: int):
    patient = get_patient(patient_id)

    if not patient:
        return None

    return {
        "patient_ref": f"patient_{patient_id:03d}",
        "age": calculate_age(patient["date_of_birth"]),
        "code_status": patient["code_status"],
        "allergies": patient["allergies"],
    }


def observations_tool(patient_id: int):
    return get_recent_observations(patient_id)


def medications_tool(patient_id: int):
    return get_medications(patient_id)


def active_orders_tool(patient_id: int):
    return get_active_orders(patient_id)


def recent_notes_tool(patient_id: int):
    return get_recent_notes(patient_id)


def patient_context_tool(patient_id: int):
    """
    Returns the minimum necessary EHR context
    required by the Clinical Context Agent.
    """

    patient = patient_tool(patient_id)

    if not patient:
        return None

    return {
        "patient": patient,
        "observations": observations_tool(patient_id),
        "medications": medications_tool(patient_id),
        "orders": active_orders_tool(patient_id),
        "notes": recent_notes_tool(patient_id),
    }
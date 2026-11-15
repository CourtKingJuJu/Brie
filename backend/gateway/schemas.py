from enum import Enum

from pydantic import BaseModel


class SourceType(str, Enum):
    observation = "observation"
    medication = "medication"
    order = "order"
    note = "note"


class Evidence(BaseModel):
    source_type: SourceType
    source_id: int


class ImportantContext(BaseModel):
    text: str
    evidence: list[Evidence]


class ContextResponse(BaseModel):
    summary: str
    important_context: list[ImportantContext]

class ContextRequest(BaseModel):
    patient_id: int
    purpose: str
    
class HandoffRequest(BaseModel):
    nurse_id: int
    purpose: str


class PatientPriority(BaseModel):
    patient_id: int
    priority: str
    rationale: str
    evidence: list[Evidence]


class PatientHandoff(BaseModel):
    patient_id: int
    summary: str
    important_context: list[ImportantContext]
    priority: PatientPriority


class HandoffResponse(BaseModel):
    shift_summary: str
    patients: list[PatientHandoff]
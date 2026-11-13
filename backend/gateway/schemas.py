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
from pydantic import BaseModel
from typing import Optional

class PeopleCreateRequest(BaseModel):
    name: str
    role: str
    email: str
    phone: str
    organization: str
    calendar_integration_id: Optional[str] = None

class PeopleUpdateRequest(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    organization: Optional[str] = None
    calendar_integration_id: Optional[str] = None
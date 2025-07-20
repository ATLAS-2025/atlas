from pydantic import BaseModel
from typing import Optional

class PeopleResponse(BaseModel):
    id: int
    name: str
    role: str
    email: str
    phone: str
    organization: str
    calendar_integration_id: Optional[str] = None

    class Config:
        orm_mode = True
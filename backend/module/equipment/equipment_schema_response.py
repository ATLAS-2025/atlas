from pydantic import BaseModel
from typing import Optional

class EquipmentResponse(BaseModel):
    id: int
    name: str
    type: str
    manufacturer: str
    model: str
    serial_number: str
    location: str
    notes: Optional[str] = None

    class Config:
        orm_mode = True
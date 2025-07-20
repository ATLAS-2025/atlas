from pydantic import BaseModel
from typing import Optional

class EquipmentCreateRequest(BaseModel):
    name: str
    type: str
    manufacturer: str
    model: str
    serial_number: str
    location: str
    notes: Optional[str] = None

class EquipmentUpdateRequest(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    manufacturer: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None
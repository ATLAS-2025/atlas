from pydantic import BaseModel
from typing import Optional

class CameraCreateRequest(BaseModel):
    name: str
    model: str
    resolution: str
    serial_number: str
    notes: Optional[str] = None

class CameraUpdateRequest(BaseModel):
    name: Optional[str] = None
    model: Optional[str] = None
    resolution: Optional[str] = None
    serial_number: Optional[str] = None
    notes: Optional[str] = None
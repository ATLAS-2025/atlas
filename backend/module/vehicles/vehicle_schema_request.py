from pydantic import BaseModel
from typing import Optional

class VehicleCreateRequest(BaseModel):
    name: str
    type: str
    license_plate: str
    capacity: str
    notes: Optional[str] = None

class VehicleUpdateRequest(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    license_plate: Optional[str] = None
    capacity: Optional[str] = None
    notes: Optional[str] = None
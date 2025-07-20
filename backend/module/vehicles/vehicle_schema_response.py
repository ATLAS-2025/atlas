from pydantic import BaseModel
from typing import Optional

class VehicleResponse(BaseModel):
    id: int
    name: str
    type: str
    license_plate: str
    capacity: str
    notes: Optional[str] = None

    class Config:
        orm_mode = True
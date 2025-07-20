from pydantic import BaseModel
from typing import Optional

class CameraResponse(BaseModel):
    id: int
    name: str
    model: str
    resolution: str
    serial_number: str
    notes: Optional[str] = None

    class Config:
        orm_mode = True
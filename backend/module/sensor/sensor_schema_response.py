from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SensorResponse(BaseModel):
    id: int
    name: str
    type: str
    model: str
    serial_number: str
    calibration_date: datetime
    notes: Optional[str] = None

    class Config:
        orm_mode = True
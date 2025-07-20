from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SensorCreateRequest(BaseModel):
    name: str
    type: str
    model: str
    serial_number: str
    calibration_date: datetime
    notes: Optional[str] = None

class SensorUpdateRequest(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    model: Optional[str] = None
    serial_number: Optional[str] = None
    calibration_date: Optional[datetime] = None
    notes: Optional[str] = None
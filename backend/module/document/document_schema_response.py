from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DocumentResponse(BaseModel):
    id: int
    name: str
    file_path: str
    type: str
    description: Optional[str] = None
    uploaded_at: datetime

    class Config:
        orm_mode = True
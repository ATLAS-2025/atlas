from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DocumentCreateRequest(BaseModel):
    name: str
    file_path: str
    type: str
    description: Optional[str] = None
    uploaded_at: Optional[datetime] = None

class DocumentUpdateRequest(BaseModel):
    name: Optional[str] = None
    file_path: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    uploaded_at: Optional[datetime] = None
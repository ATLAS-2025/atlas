from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


# ---------------------------
# Nested Test Response
# ---------------------------
class TestResponse(BaseModel):
    id: int
    admin_id: Optional[int] = None
    people_id: Optional[int] = None
    equipment_id: Optional[int] = None
    schedule: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None

    class Config:
        orm_mode = True


# ---------------------------
# Project Response
# ---------------------------
class ProjectResponse(BaseModel):
    id: int
    title: str
    subtitle: Optional[str] = None
    date: datetime
    tests: Optional[List[TestResponse]] = []

    class Config:
        orm_mode = True



class ProjectCreateResponse(BaseModel):
    id: int
    title: str
    subtitle: Optional[str] = None
    date: datetime
    
    class Config:
        orm_mode = True

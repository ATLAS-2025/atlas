from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


# ---------------------------
# Project Schemas
# ---------------------------
class ProjectCreateRequest(BaseModel):
    title: str = Field(..., example="New Test Project")
    subtitle: Optional[str] = Field(None, example="Phase 1")
    project_type: Optional[str] = Field(None, example="Alpha")
    date: Optional[datetime] = Field(default_factory=datetime.utcnow)


class ProjectUpdateRequest(BaseModel):
    title: Optional[str] = Field(None, example="Updated Project Title")
    subtitle: Optional[str] = Field(None, example="Updated Subtitle")
    date: Optional[datetime] = Field(None)
    project_type: Optional[str] = Field(None, example="Alpha")

# ---------------------------
# Test Schemas
# ---------------------------
class TestCreateRequest(BaseModel):
    project_id: int
    admin_id: Optional[int] = None
    people_id: Optional[int] = None
    equipment_id: Optional[int] = None
    schedule: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None


class TestUpdateRequest(BaseModel):
    admin_id: Optional[int] = None
    people_id: Optional[int] = None
    equipment_id: Optional[int] = None
    schedule: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None

from pydantic import BaseModel
from typing import Optional, List


# ---------------------
# Category Schemas
# ---------------------
class CategoryPersonCreateRequest(BaseModel):
    people_id: int


class CategoryEquipmentCreateRequest(BaseModel):
    equipment_id: int


class CategoryCreateRequest(BaseModel):
    name: str
    people: Optional[List[CategoryPersonCreateRequest]] = []
    equipment: Optional[List[CategoryEquipmentCreateRequest]] = []


class CategoryUpdateRequest(BaseModel):
    name: Optional[str] = None
    people: Optional[List[CategoryPersonCreateRequest]] = []
    equipment: Optional[List[CategoryEquipmentCreateRequest]] = []


# ---------------------
# Test Schemas
# ---------------------
class TestCreateRequest(BaseModel):
    project_id: int
    schedule: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None
    categories: Optional[List[CategoryCreateRequest]] = []


class TestUpdateRequest(BaseModel):
    schedule: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None
    categories: Optional[List[CategoryUpdateRequest]] = []

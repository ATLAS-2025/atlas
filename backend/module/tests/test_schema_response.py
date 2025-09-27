from pydantic import BaseModel
from typing import List, Optional
from ..people.people_schema_response import PeopleResponse
from ..equipment.equipment_schema_response import EquipmentResponse
class CategoryPersonResponse(BaseModel):
    people_id: int
    person: Optional[PeopleResponse] = None 
    class Config:
        orm_mode = True


class CategoryEquipmentResponse(BaseModel):
    equipment_id: int
    equipment:  Optional[EquipmentResponse] = None 
    class Config:
        orm_mode = True


class CategoryResponse(BaseModel):
    id: int
    name: str
    people: List[CategoryPersonResponse] = []
    equipment: List[CategoryEquipmentResponse] = []

    class Config:
        orm_mode = True


class TestResponse(BaseModel):
    id: int
    project_id: int
    schedule: Optional[str] = None
    name: Optional[str] = None
    tags: Optional[str] = None
    date: Optional[str] = None
    safety: Optional[str] = None
    maps: Optional[str] = None
    simulation: Optional[str] = None
    summary: Optional[str] = None
    categories: List[CategoryResponse] = []

    class Config:
        orm_mode = True

from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class CampaignResponse(BaseModel):
    campaign_name: str
    folder_path: str
    start_date: date
    duration_days: int
    json_file_path: Optional[str] = None

class AssignedResource(BaseModel):
    id: int
    name: str
    type: str

class CampaignDetailResponse(CampaignResponse):
    assigned_people: List[AssignedResource] = []
    assigned_equipment: List[AssignedResource] = []
    assigned_sensors: List[AssignedResource] = []

class MessageResponse(BaseModel):
    message: str
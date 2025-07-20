from pydantic import BaseModel
from typing import List
from datetime import date

class CreateCampaignRequest(BaseModel):
    campaign_name: str
    start_date: date
    duration_days: int

class LoadCampaignRequest(BaseModel):
    folder_path: str # The full path to the campaign's root directory

class AssignResourcesRequest(BaseModel):
    folder_path: str # The full path to the campaign's root directory
    people_ids: List[int] = []
    equipment_ids: List[int] = []
    sensor_ids: List[int] = []
import os
import json
import shutil
from datetime import date
from typing import List, Dict, Any, Optional

from .schema_request_campaigns import CreateCampaignRequest, LoadCampaignRequest, AssignResourcesRequest
from .schema_response_campaigns import CampaignResponse, CampaignDetailResponse, AssignedResource, MessageResponse

# Define subdirectories for a campaign
CAMPAIGN_SUBDIRS = ["plans", "data", "documents"]
from module.people import PeopleService
from module.equipment import EquipmentService
from module.sensor import SensorService

class CampaignService:
    def __init__(
        self,
        people_service: PeopleService,
        equipment_service: EquipmentService,
        sensor_service: SensorService,
        base_campaign_dir: str = "campaigns"
    ):
        self.people_service = people_service
        self.equipment_service = equipment_service
        self.sensor_service = sensor_service
        self.base_campaign_dir = base_campaign_dir
        os.makedirs(self.base_campaign_dir, exist_ok=True)

    def _get_campaign_path(self, campaign_name: str) -> str:
        return os.path.join(self.base_campaign_dir, campaign_name)

    def _get_campaign_json_path(self, campaign_name: str) -> str:
        return os.path.join(self._get_campaign_path(campaign_name), f"{campaign_name}.json")

    async def create_campaign(self, request: CreateCampaignRequest) -> CampaignResponse:
        campaign_path = self._get_campaign_path(request.campaign_name)

        if os.path.exists(campaign_path):
            raise ValueError(f"Campaign '{request.campaign_name}' already exists.")

        # Create the main campaign directory
        os.makedirs(campaign_path)

        # Create subdirectories
        for subdir in CAMPAIGN_SUBDIRS:
            os.makedirs(os.path.join(campaign_path, subdir), exist_ok=True)

        json_file_path = self._get_campaign_json_path(request.campaign_name)

        campaign_data = {
            "name": request.campaign_name,
            "folder_path": os.path.abspath(campaign_path), # Store the actual created path
            "start_date": request.start_date.isoformat(),
            "duration_days": request.duration_days,
            "assigned_people": [],
            "assigned_equipment": [],
            "assigned_sensors": []
        }

        with open(json_file_path, "w") as f:
            json.dump(campaign_data, f, indent=4)

        return CampaignResponse(
            campaign_name=request.campaign_name,
            folder_path=os.path.abspath(campaign_path),
            start_date=request.start_date,
            duration_days=request.duration_days,
            json_file_path=os.path.abspath(json_file_path)
        )

    async def load_campaign(self, request: LoadCampaignRequest) -> CampaignDetailResponse:
        campaign_path = request.folder_path
        campaign_name = os.path.basename(campaign_path) # Assuming folder name is campaign name
        campaign_json_path = self._get_campaign_json_path(campaign_name)

        if not os.path.exists(campaign_json_path):
            raise FileNotFoundError(f"Campaign JSON file not found at '{campaign_json_path}'.")

        with open(campaign_json_path, "r") as f:
            campaign_data = json.load(f)

        assigned_people = await self._get_resource_details(campaign_data.get("assigned_people", []), "people")
        assigned_equipment = await self._get_resource_details(campaign_data.get("assigned_equipment", []), "equipment")
        assigned_sensors = await self._get_resource_details(campaign_data.get("assigned_sensors", []), "sensors")

        return CampaignDetailResponse(
            campaign_name=campaign_data["name"],
            folder_path=campaign_data["folder_path"],
            start_date=date.fromisoformat(campaign_data["start_date"]),
            duration_days=campaign_data["duration_days"],
            json_file_path=campaign_json_path,
            assigned_people=assigned_people,
            assigned_equipment=assigned_equipment,
            assigned_sensors=assigned_sensors
        )

    async def assign_resources_to_campaign(self, request: AssignResourcesRequest) -> MessageResponse:
        campaign_name = request.folder_path # Assuming folder_path is the campaign name
        campaign_path = self._get_campaign_path(campaign_name)
        campaign_json_path = self._get_campaign_json_path(campaign_name)
        print(campaign_json_path)
        if not os.path.exists(campaign_json_path):
            raise FileNotFoundError(f"Campaign JSON file not found for '{campaign_name}'.")

        with open(campaign_json_path, "r") as f:
            campaign_data = json.load(f)

        campaign_data["assigned_people"] = list(set(campaign_data.get("assigned_people", []) + request.people_ids))
        campaign_data["assigned_equipment"] = list(set(campaign_data.get("assigned_equipment", []) + request.equipment_ids))
        campaign_data["assigned_sensors"] = list(set(campaign_data.get("assigned_sensors", []) + request.sensor_ids))
        print(campaign_json_path)
        print(campaign_data)
        with open(campaign_json_path, "w") as f:
            json.dump(campaign_data, f, indent=4)

        return MessageResponse(message=f"Resources assigned to campaign '{campaign_name}' successfully.")

    async def _get_resource_details(self, resource_ids: List[int], resource_type: str) -> List[AssignedResource]:
        details = []
        for resource_id in resource_ids:
            if resource_type == "people":
                resource = await self.people_service.get_person_by_id(resource_id)
            elif resource_type == "equipment":
                resource = await self.equipment_service.get_equipment_by_id(resource_id)
            elif resource_type == "sensors":
                resource = await self.sensor_service.get_sensor_by_id(resource_id)
            else:
                resource = None

            if resource:
                # Assuming resources have 'id' and 'name' attributes
                details.append(AssignedResource(id=resource.id, name=resource.name, type=resource_type))
        return details

    async def get_all_campaigns(self) -> List[CampaignResponse]:
        campaigns = []
        for campaign_name in os.listdir(self.base_campaign_dir):
            campaign_path = self._get_campaign_path(campaign_name)
            if os.path.isdir(campaign_path):
                json_file_path = self._get_campaign_json_path(campaign_name)
                if os.path.exists(json_file_path):
                    with open(json_file_path, "r") as f:
                        campaign_data = json.load(f)
                    campaigns.append(CampaignResponse(
                        campaign_name=campaign_data["name"],
                        folder_path=campaign_data["folder_path"],
                        start_date=date.fromisoformat(campaign_data["start_date"]),
                        duration_days=campaign_data["duration_days"],
                        json_file_path=json_file_path
                    ))
        return campaigns

    async def delete_campaign(self, campaign_name: str) -> MessageResponse:
        campaign_path = self._get_campaign_path(campaign_name)
        if not os.path.exists(campaign_path):
            raise FileNotFoundError(f"Campaign '{campaign_name}' not found.")

        shutil.rmtree(campaign_path)
        return MessageResponse(message=f"Campaign '{campaign_name}' deleted successfully.")

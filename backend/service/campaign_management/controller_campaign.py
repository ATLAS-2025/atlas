from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from .campaign_service import CampaignService
from .schema_request_campaigns import CreateCampaignRequest, LoadCampaignRequest, AssignResourcesRequest
from .schema_response_campaigns import CampaignResponse, CampaignDetailResponse, MessageResponse
from module.people import PeopleService
from module.equipment import EquipmentService
from module.sensor import SensorService
from core.fastapi.dependencies import AuthenticationRequired

router = APIRouter()

class CampaignController:
    def __init__(
        self,
        campaign_service: CampaignService,
        people_service: PeopleService,
        equipment_service: EquipmentService,
        sensor_service: SensorService
    ):
        self.campaign_service = campaign_service
        self.people_service = people_service
        self.equipment_service = equipment_service
        self.sensor_service = sensor_service

    async def create_campaign(self, request: CreateCampaignRequest):
        try:
            return await self.campaign_service.create_campaign(request)
        except ValueError as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

    async def load_campaign(self, request: LoadCampaignRequest):
        try:
            return await self.campaign_service.load_campaign(request)
        except FileNotFoundError as e:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

    async def assign_resources(self, request: AssignResourcesRequest):
        try:
            return await self.campaign_service.assign_resources_to_campaign(request)
        except FileNotFoundError as e:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    async def get_all_campaigns(self):
        return await self.campaign_service.get_all_campaigns()

    async def delete_campaign(self, campaign_name: str):
        try:
            return await self.campaign_service.delete_campaign(campaign_name)
        except FileNotFoundError as e:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
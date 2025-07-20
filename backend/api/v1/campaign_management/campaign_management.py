from typing import Callable, List
from fastapi import APIRouter, Depends, HTTPException, status

from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from core.fastapi.dependencies.permissions import Permissions
from service.campaign_management import CampaignController
from service.campaign_management.schema_request_campaigns import (
    CreateCampaignRequest,
    LoadCampaignRequest,
    AssignResourcesRequest,
)
from service.campaign_management.schema_response_campaigns import (
    CampaignResponse,
    CampaignDetailResponse,
    MessageResponse,
)
from module.user import UserPermission


campaign_management_router = APIRouter()


@campaign_management_router.post(
    "/create",
    response_model=CampaignResponse, 
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(AuthenticationRequired)],
)
async def create_campaign(
    request: CreateCampaignRequest,
    campaign_controller: CampaignController = Depends(Factory().get_campaign_controller),
    # assert_access: Callable = Depends(Permissions(UserPermission.CREATE)),
):
    try:
        campaign = await campaign_controller.create_campaign(request)
        # assert_access(resource=campaign)
        return campaign
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@campaign_management_router.post(
    "/load",
    response_model=CampaignDetailResponse,
    dependencies=[Depends(AuthenticationRequired)],
)
async def load_campaign(
    request: LoadCampaignRequest,
    campaign_controller: CampaignController = Depends(Factory().get_campaign_controller),
    # assert_access: Callable = Depends(Permissions(UserPermission.READ)),
):
    try:
        campaign = await campaign_controller.load_campaign(request)
        # assert_access(resource=campaign)
        return campaign
    except FileNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))


@campaign_management_router.post(
    "/assign_resources",
    response_model=MessageResponse,
    dependencies=[Depends(AuthenticationRequired)],
)
async def assign_resources(
    request: AssignResourcesRequest,
    campaign_controller: CampaignController = Depends(
        Factory().get_campaign_controller
    ),
    # assert_access: Callable = Depends(Permissions(UserPermission.EDIT)),
):
    try:
        message = await campaign_controller.assign_resources(request)
        # assert_access(resource=message)
        return message
    except FileNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@campaign_management_router.get(
    "/", response_model=List[CampaignResponse], dependencies=[Depends(AuthenticationRequired)]
)
async def get_all_campaigns(
    campaign_controller: CampaignController = Depends(Factory().get_campaign_controller),
    # assert_access: Callable = Depends(Permissions(UserPermission.READ)),
):
    campaigns = await campaign_controller.get_all_campaigns()
    # assert_access(resource=campaigns)
    return campaigns


@campaign_management_router.delete(
    "/{campaign_name}",
    response_model=MessageResponse,
    dependencies=[Depends(AuthenticationRequired)],
)
async def delete_campaign(
    campaign_name: str,
    campaign_controller: CampaignController = Depends(Factory().get_campaign_controller),
    # assert_access: Callable = Depends(Permissions(UserPermission.DELETE)),
):
    try:
        message = await campaign_controller.delete_campaign(campaign_name)
        # assert_access(resource=message)
        return message
    except FileNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

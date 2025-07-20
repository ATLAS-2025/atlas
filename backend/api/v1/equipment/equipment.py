from typing import Callable

from fastapi import APIRouter, Depends, Request

from service.auth import AuthController, Token
from module.equipment import (
    Equipment,
    EquipmentUpdateRequest,
    EquipmentCreateRequest,
    EquipmentResponse,
    EquipmentController,
    EquipmentService,
)
from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from core.fastapi.dependencies.current_user import get_current_user
from core.fastapi.dependencies.permissions import Permissions

equipment_router = APIRouter()


@equipment_router.get("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def get_equipment(
    id: int,
    equipment_controller: EquipmentController = Depends(Factory().get_equipment_controller),
) -> EquipmentResponse:
    equipment = await equipment_controller.get_equipment_by_id(id)

    return equipment


@equipment_router.post("/", dependencies=[Depends(AuthenticationRequired)])
async def create_equipment(
    equipment_create_request: EquipmentCreateRequest,
    equipment_controller: EquipmentController = Depends(Factory().get_equipment_controller),
) -> EquipmentResponse:
    equipment = await equipment_controller.create_equipment(equipment_create_request)
    return equipment


@equipment_router.put("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def update_equipment(
    id: int,
    equipment_update_request: EquipmentUpdateRequest,
    equipment_controller: EquipmentController = Depends(Factory().get_equipment_controller),
) -> EquipmentResponse:
    equipment = await equipment_controller.update_equipment(id, equipment_update_request)
    return equipment


@equipment_router.delete("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_equipment(
    id: int,
    equipment_controller: EquipmentController = Depends(Factory().get_equipment_controller),
):
    await equipment_controller.delete_equipment(id)
    return {"message": "Equipment deleted successfully"}


@equipment_router.get("/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_equipment(
    equipment_controller: EquipmentController = Depends(Factory().get_equipment_controller),
) -> list[EquipmentResponse]:
    all_equipment = await equipment_controller.get_all_equipment()
    return all_equipment
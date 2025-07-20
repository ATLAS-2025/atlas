from typing import Callable

from fastapi import APIRouter, Depends, Request

from service.auth import AuthController, Token
from module.sensor import (
    Sensor,
    SensorUpdateRequest,
    SensorCreateRequest,
    SensorResponse,
    SensorController,
    SensorService,
)
from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from core.fastapi.dependencies.current_user import get_current_user
from core.fastapi.dependencies.permissions import Permissions

sensor_router = APIRouter()


@sensor_router.get("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def get_sensor(
    id: int,
    sensor_controller: SensorController = Depends(Factory().get_sensor_controller),
) -> SensorResponse:
    sensor = await sensor_controller.get_sensor_by_id(id)

    return sensor


@sensor_router.post("/", dependencies=[Depends(AuthenticationRequired)])
async def create_sensor(
    sensor_create_request: SensorCreateRequest,
    sensor_controller: SensorController = Depends(Factory().get_sensor_controller),
) -> SensorResponse:
    sensor = await sensor_controller.create_sensor(sensor_create_request)
    return sensor


@sensor_router.put("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def update_sensor(
    id: int,
    sensor_update_request: SensorUpdateRequest,
    sensor_controller: SensorController = Depends(Factory().get_sensor_controller),
) -> SensorResponse:
    sensor = await sensor_controller.update_sensor(id, sensor_update_request)
    return sensor


@sensor_router.delete("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_sensor(
    id: int,
    sensor_controller: SensorController = Depends(Factory().get_sensor_controller),
):
    await sensor_controller.delete_sensor(id)
    return {"message": "Sensor deleted successfully"}


@sensor_router.get("/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_sensors(
    sensor_controller: SensorController = Depends(Factory().get_sensor_controller),
) -> list[SensorResponse]:
    all_sensors = await sensor_controller.get_all_sensors()
    return all_sensors
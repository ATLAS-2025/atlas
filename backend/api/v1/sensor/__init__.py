import core.database
from fastapi import APIRouter

from .sensor import sensor_router as p_r

sensor_router = APIRouter()
sensor_router.include_router(p_r, tags=["Sensor"])

__all__ = ["sensor_router"]

from fastapi import APIRouter

from .monitoring import monitoring_router
from .users import users_router
from .people import people_router
from .equipment import equipment_router
from .sensor import sensor_router

from .campaign_management import  campaign_management_router

v1_router = APIRouter()
v1_router.include_router(monitoring_router, prefix="/monitoring")
v1_router.include_router(users_router, prefix="/users")
v1_router.include_router(people_router, prefix="/people")
v1_router.include_router(equipment_router, prefix="/equipment")
v1_router.include_router(sensor_router, prefix="/sensor")

v1_router.include_router(campaign_management_router, prefix="/campaigns")

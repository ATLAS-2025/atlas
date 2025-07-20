from fastapi import APIRouter

from .equipment import equipment_router as p_r

equipment_router = APIRouter()
equipment_router.include_router(p_r, tags=["Equipment"])

__all__ = ["equipment_router"]

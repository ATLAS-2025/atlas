from fastapi import APIRouter

from .people import people_router as p_r

people_router = APIRouter()
people_router.include_router(p_r, tags=["People"])

__all__ = ["people_router"]

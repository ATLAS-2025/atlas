import core.database
from fastapi import APIRouter

from .project import project_router as p_r

project_router = APIRouter()
project_router.include_router(p_r, tags=["Project"])

__all__ = ["project_router"]

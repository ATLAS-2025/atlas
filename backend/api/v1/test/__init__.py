import core.database
from fastapi import APIRouter

from .test import test_router as p_r

test_router = APIRouter()
test_router.include_router(p_r, tags=["Tests"])

__all__ = ["test_router"]

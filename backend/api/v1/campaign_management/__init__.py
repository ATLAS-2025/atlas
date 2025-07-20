from fastapi import APIRouter

from .campaign_management import campaign_management_router as p_r

campaign_management_router = APIRouter()
campaign_management_router.include_router(p_r, tags=["Campaign management"])

__all__ = ["campaign_management_router"]

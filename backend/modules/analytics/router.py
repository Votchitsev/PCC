from fastapi import APIRouter

from .crud.inspection_analytics import router as inspection_analytics_router


router = APIRouter(
  prefix="/analytics",
  tags=["Аналитика"],
)


router.include_router(inspection_analytics_router)

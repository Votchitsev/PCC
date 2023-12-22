from fastapi import APIRouter, Depends

from modules.auth.utils.dependencies import get_current_user
from .crud.inspection_analytics import router as inspection_analytics_router
from .crud.question_analytics import router as question_analytics_router
from .crud.department_group_analytics import router as department_group_router_analytics

router = APIRouter(
  prefix="/analytics",
  tags=["Аналитика"],
  dependencies=[Depends(get_current_user)]
)


router.include_router(inspection_analytics_router)
router.include_router(question_analytics_router)
router.include_router(department_group_router_analytics)

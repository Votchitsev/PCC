from fastapi import APIRouter, Depends

from modules.auth.utils.dependencies import get_current_user
from .crud.inspection import router as inspection_router
from .crud.inspection_by_department import router as inspection_by_department_router


router = APIRouter(
    prefix="/inspection",
    tags=["Создание, редактирование и удаление проверок"],
    dependencies=[Depends(get_current_user)]
)


router.include_router(inspection_router)
router.include_router(inspection_by_department_router)

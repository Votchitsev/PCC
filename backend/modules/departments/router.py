from fastapi import APIRouter, Depends

from modules.auth.utils.dependencies import get_current_user
from .crud.department_group import router as department_group_router
from .crud.departments import router as departments_router

router = APIRouter(
  prefix="/departments",
  tags=["Создание, редактирование и удаление подразделений"],
  dependencies=[Depends(get_current_user)]
)


router.include_router(department_group_router)
router.include_router(departments_router)

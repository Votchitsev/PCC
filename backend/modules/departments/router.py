from fastapi import APIRouter
from .crud.department_group import router as department_group_router
from .crud.departments import router as departments_router

router = APIRouter(
  prefix="/departments",
  tags=["Создание, редактирование и удаление подразделений"],
)


router.include_router(department_group_router)
router.include_router(departments_router)

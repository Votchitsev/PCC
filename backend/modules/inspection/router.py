from fastapi import APIRouter
from .crud.inspection import router as inspection_router


router = APIRouter(
    prefix="/inspection",
    tags=["Создание, редактирование и удаление проверок"],
)


router.include_router(inspection_router)

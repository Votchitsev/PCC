from fastapi import APIRouter, Depends

from modules.auth.utils.dependencies import get_current_user
from .crud.profile import router as profile_router
from .crud.position import router as position_router
from .crud.responsibility import router as responsibility_router

router = APIRouter(
    prefix="/employees",
    tags=["Создание, редактирование и удаление сотрудников и должностей"],
    dependencies=[Depends(get_current_user)]
)


router.include_router(
    profile_router
)

router.include_router(
    position_router
)

router.include_router(
    responsibility_router
)

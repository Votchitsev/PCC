from fastapi import APIRouter
from .crud.sign_up import router as sign_up_router
from .crud.sign_in import router as sign_in_router
from .crud.get_user import router as get_user_router
from .crud.logout import router as logout_router


router = APIRouter(
    prefix='/auth',
    tags=['Регистрация и авторизация пользователей'],
)

router.include_router(sign_up_router)
router.include_router(sign_in_router)
router.include_router(get_user_router)
router.include_router(logout_router)

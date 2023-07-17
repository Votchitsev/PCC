from fastapi import APIRouter
from .sign_up import router as sign_up_router
from .sign_in import router as sign_in_router
from .get_user import router as get_user_router

router = APIRouter(prefix='/auth')

router.include_router(sign_up_router)
router.include_router(sign_in_router)
router.include_router(get_user_router)

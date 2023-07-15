from fastapi import APIRouter
from .sign_up import router as sign_up_router

router = APIRouter(prefix='/auth')

router.include_router(sign_up_router)

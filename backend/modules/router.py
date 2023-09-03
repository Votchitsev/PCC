from fastapi import APIRouter
from .auth import router as auth_router
from .check_list import router as check_list_router
from .departments import router as departments_router

router = APIRouter(prefix='/api')

router.include_router(auth_router.router)
router.include_router(check_list_router.router)
router.include_router(departments_router.router)

from fastapi import APIRouter
from .auth import router as auth_router
from .check_list import router as check_list_router
from .departments import router as departments_router
from .inspection import router as inspection_router
from .employees import router as employees_router

router = APIRouter(prefix='/api')

router.include_router(auth_router.router)
router.include_router(check_list_router.router)
router.include_router(departments_router.router)
router.include_router(inspection_router.router)
router.include_router(employees_router.router)

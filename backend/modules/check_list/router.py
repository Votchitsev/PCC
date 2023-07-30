from fastapi import APIRouter
from .crud.createCheckList import router as create_check_list_router


router = APIRouter(prefix="/check-list")

router.include_router(create_check_list_router)

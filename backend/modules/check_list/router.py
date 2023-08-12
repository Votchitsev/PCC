from fastapi import APIRouter
from .crud.createCheckList import router as create_check_list_router
from .crud.getCheckLists import router as get_check_lists_router
from .crud.get_check_list_by_id import router as get_check_list_by_id_router


router = APIRouter(prefix="/check-list")

router.include_router(create_check_list_router)
router.include_router(get_check_lists_router)
router.include_router(get_check_list_by_id_router)
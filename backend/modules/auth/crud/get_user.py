from fastapi import Depends, APIRouter
from modules.auth.utils import dependencies
from ..schemas import User


router = APIRouter(prefix='/me')

@router.get('/')
def me(current_user: User = Depends(dependencies.get_current_user)):
    return {
        "username": current_user.username,
    }

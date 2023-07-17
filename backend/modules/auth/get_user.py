from fastapi import Depends, APIRouter
from pydantic import BaseModel
from modules.auth.utils import dependencies



router = APIRouter(prefix='/me')

class UserModel(BaseModel):
    id: int
    username: str

@router.get('/')
def me(current_user: UserModel = Depends(dependencies.get_current_user)):
    return current_user

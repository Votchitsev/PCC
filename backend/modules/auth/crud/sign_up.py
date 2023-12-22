from fastapi import APIRouter, Depends, HTTPException
from modules.auth.utils import users as users_utils
from modules.auth.utils.dependencies import get_current_user
from ..schemas import SignUpData


router = APIRouter(
    prefix="/sign-up",
)


@router.post('/', description="Регистрация пользователя", summary="Регистрация пользователя")
async def sign_up(data: SignUpData, _ = Depends(get_current_user)):
    db_user = await users_utils.get_user_by_name(username=data.username)

    if db_user:
        raise HTTPException(status_code=400, detail="USER_EXISTS")
    return await users_utils.create_user(user=data)

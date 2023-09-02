from fastapi import APIRouter, HTTPException
from modules.auth.utils import users as users_utils
from ..schemas import SignUpData


router = APIRouter(
    prefix="/sign-up",
)


@router.post('/', description="Регистрация пользователя", summary="Регистрация пользователя")
async def sign_up(data: SignUpData):
    db_user = await users_utils.get_user_by_name(username=data.username)

    if db_user:
        raise HTTPException(status_code=400, detail="USER_EXISTS")
    return await users_utils.create_user(user=data)

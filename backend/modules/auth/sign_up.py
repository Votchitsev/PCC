from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from modules.auth.utils import users as users_utils


router = APIRouter(
    prefix="/sign-up"
)


class Credentials(BaseModel):
    username: str;
    password: str;
    confirmPassword: str;


@router.post('/')
async def sign_up(data: Credentials):
    db_user = await users_utils.get_user_by_name(username=data.username)

    if db_user:
        raise HTTPException(status_code=400, detail="USER_EXISTS")
    return await users_utils.create_user(user=data)

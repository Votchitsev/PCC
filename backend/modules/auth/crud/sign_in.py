from typing import Annotated
from fastapi import Depends, APIRouter, HTTPException, Form
from fastapi.security import OAuth2PasswordRequestForm
from modules.auth.utils import users as users_utils


router = APIRouter(prefix='/sign-in')


@router.post('/', summary="Авторизация пользователя")
async def sign_in(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = await users_utils.get_user_by_name(username=form_data.username)

    if not user:
        raise HTTPException(
            status_code=400,
            detail="BAD_CREDENTIALS",
        )
    
    if not users_utils.validate_password(
        password=form_data.password,
        hashed_password=user["password"],
    ):
        raise HTTPException(
            status_code=400,
            detail="BAD_CREDENTIALS",
        )
    
    response = await users_utils.create_user_token(user_id=user["id"])
    
    return {
        "access_token": response['token'],
        "token_type": "bearer",
    }

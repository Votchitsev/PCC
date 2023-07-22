from fastapi import Depends, APIRouter, HTTPException
from modules.auth.utils import users as users_utils
from ..schemas import SignInData


router = APIRouter(prefix='/sign-in')


@router.post('/')
async def sign_in(form_data: SignInData):
    user = await users_utils.get_user_by_name(username=form_data.username)

    if not user:
        raise HTTPException(status_code=400, detail="BAD_CREDENTIALS")
    
    if not users_utils.validate_password(
        password=form_data.password, hashed_password=user["password"]
    ):
        raise HTTPException(status_code=400, detail="BAD_CREDENTIALS")
    
    return await users_utils.create_user_token(user_id=user["id"])

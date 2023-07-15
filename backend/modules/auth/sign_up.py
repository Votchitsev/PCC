from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel


router = APIRouter(
    prefix="/sign-up"
)

class Credentials(BaseModel):
    username: str;
    password: str;
    confirmPassword: str;


@router.post('/')
async def sign_up(data: Credentials):
    return data

import modules.auth.utils.users as user_utils
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = await user_utils.get_user_by_token(token=token)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="INVALID CREDENTIALS",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    return user

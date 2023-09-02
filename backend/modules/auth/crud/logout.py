from fastapi import Depends, APIRouter, HTTPException
from db.database import database
from ..utils.dependencies import get_current_user
from ..models.tables import tokens


router = APIRouter(prefix='/logout')


@router.post('/', summary="Выход из аккаунта")
async def logout(current_user = Depends(get_current_user)):
    try:
        query = (
            tokens.delete()
            .where(tokens.c.id == current_user.id)
        )

        await database.execute(query)

        return {
            "detail": "USER LOGOUT"
        }

    except:
        HTTPException(status_code=500, detail="UNKNOWN ERROR")

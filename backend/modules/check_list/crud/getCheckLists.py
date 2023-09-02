from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from modules.auth.schemas import User
from modules.auth.utils.dependencies import get_current_user
from db.database import database
from ..models.tables import check_list


router = APIRouter(
    prefix="/all"
)


@router.get('/', summary="Получение всех чек-листов")
async def get(user: User = Depends(get_current_user)):
    try:
        if user:
            query = (
                select(check_list)
                    .order_by(check_list.c.id)
            )

            response = await database.fetch_all(query)   

            return response

    except:
        HTTPException(status_code=500, detail="UNKNOWN_ERROR")

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy import select
from modules.auth.utils.dependencies import get_current_user
from db.database import database
from ..models.tables import check_list


router = APIRouter(
    prefix="/list"
)


@router.get('/')
async def get():
    try:
        query = (
            select(check_list)
        )

        response = await database.fetch_all(query)   

        return response

    except:
        HTTPException(status_code=500, detail="UNKNOWN_ERROR")

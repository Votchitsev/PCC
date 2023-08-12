from fastapi import APIRouter, HTTPException
from db.database import database
from ..models.tables import check_list, questions


router = APIRouter(
    prefix='/{id}'
)


@router.get('/')
async def get(id: int):
    """Get check list name and its questions by id"""

    try:
        info_query = (
            check_list.select()
                .where(check_list.c.id == id)
        )

        info = await database.fetch_one(info_query)

        if info is None:
            return HTTPException(
                status_code=400,
                detail="CHECK_LIST_NOT_EXISTS"
            )

        details_query = (
            questions.select()
                .where(questions.c.check_list_id == id)
        )
        
        details = await database.fetch_all(details_query)

        return {
            "id": info["id"],
            "name": info["name"],
            "questions": details
        }

    except:
        return HTTPException(status_code=500, detail="UNKNOWN_ERROR")

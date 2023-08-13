from fastapi import APIRouter, HTTPException
from db.database import database
from ..models.tables import check_list, questions
from ..schemas.schemas import SCheckListData


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
            raise HTTPException(
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
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")


@router.put('/')
async def put(id: int, data: SCheckListData):
    """Change existing check list"""

    name_query = (
        check_list.select()
            .where(check_list.c.name == data.title)
    )

    name = await database.fetch_one(name_query)

    if name != None:
        raise HTTPException(status_code=400, detail="TITLE_EXISTS") 

    update_query = (
        check_list.update()
            .where(check_list.c.id == id)
            .values(name = data.title)
    )

    await database.execute(update_query)

    delete_questions_query = (
        questions.delete()
            .where(questions.c.check_list_id == id)
    )

    await database.execute(delete_questions_query)

    for question in data.questions:
        question_query = (
                questions.insert()
                .values(
                    text=question.text,
                    grade=question.grade,
                    check_list_id=id,
                )
            )

        await database.execute(question_query)

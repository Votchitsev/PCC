from fastapi import APIRouter, HTTPException, Depends
from modules.auth.utils.dependencies import get_current_user
from db.database import database
from ..schemas.schemas import SCheckListData
from ..models.tables import check_list, questions


router = APIRouter(
    prefix="/create"
)

@router.post('/')
async def create_check_list(CheckListData: SCheckListData, current_user = Depends(get_current_user)):
    try:
        create_check_list_query = (
            check_list.insert()
                .values(name=CheckListData.title)
                .returning(check_list)
        )

        check_list_id = await database.execute(create_check_list_query)

        for question in CheckListData.questions:
            question_query = (
                questions.insert()
                .values(
                    text=question.text,
                    grade=question.grade,
                    check_list_id=check_list_id,
                )
            )

            await database.execute(question_query)

    except:
        HTTPException(status_code=500, detail="UNKNOWN ERROR")

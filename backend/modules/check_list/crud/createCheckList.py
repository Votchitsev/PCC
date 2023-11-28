from fastapi import APIRouter, HTTPException, Depends
from modules.auth.utils.dependencies import get_current_user
from db.database import database
from ..schemas.schemas import SCheckListData
from ..models.tables import check_list, questions


router = APIRouter(
    prefix="/create"
)

@router.post('/', summary="Создание чек-листа")
async def create_check_list(CheckListData: SCheckListData, _ = Depends(get_current_user)):
    if not CheckListData.title:
        raise HTTPException(status_code=400, detail="TITLE_REQUIRED")

    try:
        create_check_list_query = (
            check_list.insert()
                .values(name=CheckListData.title)
                .returning(check_list)
        )

        check_list_id = await database.execute(create_check_list_query)

        total_grade = 0

        for question in CheckListData.questions:
            question_query = (
                questions.insert()
                .values(
                    text=question.text,
                    grade=question.grade,
                    check_list_id=check_list_id,
                    parent_question_id=question.parent_question_id
                )
            )
 
            await database.execute(question_query)

            if question.parent_question_id is None:
                total_grade += question.grade

        total_grade_query = (
            check_list.update()
                .where(check_list.c.id == check_list_id)
                .values(total_grade=total_grade) 
        )
        
        await database.execute(total_grade_query)

    except:
        HTTPException(status_code=500, detail="UNKNOWN ERROR")

from fastapi import APIRouter
from ..schemas.responsibility import SResponsibility
from ..models.tables import responsibility_question
from db.database import database


router = APIRouter(
    prefix="/responsibility",
)


@router.post("/", summary="Создание ответственности")
async def create_responsibility(data: SResponsibility):
    for question in data.questions:
        create_responsibility_query = (
            responsibility_question.insert()
                .values(
                    question_id=question,
                    position_id=data.position_id,
                )
        )

        await database.execute(create_responsibility_query)

    return True

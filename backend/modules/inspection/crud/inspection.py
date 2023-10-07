from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy import select
from db.database import database
from modules.auth.utils.dependencies import get_current_user
from modules.inspection.schemas.schemas import SInspection, SInspectionQuestion, SInspectionQuestionChange
from ..models.tables import inspection, inspection_question
from modules.departments.models.tables import department, department_group
from modules.check_list.models.tables import questions, check_list
from ..utils.build_result import build_inspection_result


router = APIRouter(
    prefix="",
)


@router.post('/summary-info', summary="Создание проверки")
async def create_inspection(inspection_data: SInspection, _ = Depends(get_current_user)):
    department_query = (
        department.select()
            .where(department.c.id == inspection_data.department_id)
    )

    inspection_department = await database.fetch_one(department_query)

    if not inspection_department:
        raise HTTPException(status_code=400, detail="DEPARTMENT_NOT_EXISTS")

    create_inspection_query = (
        inspection.insert()
            .values(
                department_id=inspection_department.id,
                date=inspection_data.date,
                check_list_id=inspection_data.check_list_id,
            ).returning(inspection)
    )

    created_inspection = await database.fetch_one(create_inspection_query)

    return created_inspection


@router.post('/result', summary="Добавление результатов проверки")
async def create_result(result: list[SInspectionQuestion], _ = Depends(get_current_user)):
    for question in result:
        create_result_query = (
            inspection_question.insert()
                .values(
                    question_id=question.question_id,
                    inspection_id=question.inspection_id,
                    result=question.result,
                )
        )

        await database.execute(create_result_query)

    response = await build_inspection_result(result[0].inspection_id)

    return response


@router.put('/result/{id}', summary="Изменение результатов проверки")
async def put(id: int, result: list[SInspectionQuestionChange], _ = Depends(get_current_user)):
    result_query = (
        inspection_question.select()
            .where(inspection_question.c.inspection_id == id)
    )

    oldResult = await database.fetch_all(result_query)

    for question in result:
        if (question.question_id in [i.question_id for i in oldResult]):
            update_query = (
                inspection_question.update()
                    .where(inspection_question.c.question_id == question.question_id)
                    .values(
                        question_id=question.question_id,
                        inspection_id=id,
                        result=question.result,
                    )
            )

            await database.execute(update_query)

    response = await build_inspection_result(id)

    return response


@router.get('/', summary="Получение списка проверок")
async def get_all():
    inspection_list_query = (
        select(
            inspection.c.id,
            department.c.name.label("department"),
            department_group.c.name.label("department_group"),
            inspection.c.date,
            inspection.c.total_result
        )
        .join(department, inspection.c.department_id == department.c.id)
        .join(department_group, department.c.department_group_id == department_group.c.id)
        .group_by(
            inspection.c.id,
            department.c.name,
            department_group.c.name,
            inspection.c.date,
            inspection.c.total_result,
        )
    )

    inspection_list = await database.fetch_all(inspection_list_query)

    return inspection_list


@router.get('/{id}', summary="Получение информации о проверке")
async def get_inspection_by_id(id: int):
    response = await build_inspection_result(id)

    return response


@router.delete('/result/{id}', summary="Получение результатов проверки")
async def delete_result(id: int):
    delete_result_query = (
        inspection_question.delete()
            .where(inspection_question.c.inspection_id == id)
    )

    delete_inspection_query = (
        inspection.delete()
            .where(inspection.c.id == id)
    )

    await database.execute(delete_result_query)
    await database.execute(delete_inspection_query)

    return "OK"

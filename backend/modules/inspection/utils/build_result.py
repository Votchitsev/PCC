from sqlalchemy import select
from modules.check_list.models.tables import questions, check_list
from ..models.tables import inspection, inspection_question
from modules.departments.models.tables import department, department_group
from modules.auth.utils.dependencies import get_current_user
from modules.inspection.schemas.schemas import SInspection, SInspectionQuestion
from db.database import database


async def build_inspection_result(inspection_id: int):
    inspection_result_query = (
        select(
            questions.c.id,
            questions.c.text,
            questions.c.grade,
            inspection_question.c.result,
        )
        .join(questions, inspection_question.c.question_id == questions.c.id)
        .where(inspection.c.id == inspection_id)
        .group_by(
            questions.c.id,
            questions.c.text,
            questions.c.grade,
            inspection_question.c.result,
        )
        .order_by(
            questions.c.id
        )
    )

    inspection_result = await database.fetch_all(inspection_result_query)

    inspection_summary_query = (
        select(
            inspection.c.id,
            inspection.c.department_id,
            inspection.c.date,
            check_list.c.total_grade.label("total_grade"),
            department.c.name.label("department"),
            department_group.c.name.label("department_group"),
        )
        .join(department, inspection.c.department_id == department.c.id)
        .join(department_group, department.c.department_group_id == department_group.c.id)
        .join(check_list, inspection.c.check_list_id == check_list.c.id)
        .where(inspection.c.id == inspection_id)
        .group_by(
            inspection.c.id,
            inspection.c.department_id,
            inspection.c.date,
            check_list.c.total_grade,
            department.c.name,
            department_group.c.name
        )
    )

    inspection_summary = await database.fetch_one(inspection_summary_query)

    result = 0

    for i in inspection_result:
        if i.result:
            result += i.grade

    total_result = (result / inspection_summary["total_grade"]) * 100

    add_total_result_query = (
        inspection.update()
            .where(inspection.c.id == inspection_id)
            .values(
                total_result=total_result
            )
    )

    await database.execute(add_total_result_query)

    return {
        "id": inspection_summary["id"],
        "date": inspection_summary["date"],
        "department": inspection_summary["department"],
        "department_group": inspection_summary["department_group"],
        "result": inspection_result,
        "total_result": total_result,
    }

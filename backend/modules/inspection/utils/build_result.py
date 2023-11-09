from sqlalchemy import select
from modules.check_list.models.tables import check_list
from ..models.tables import inspection
from modules.departments.models.tables import department, department_group
from db.database import database
from .common_result import ResultCalculation
from .employee_result import EmployeeResultCalculation


async def build_inspection_result(inspection_id: int):
    inspection_summary_query = (
        select(
            inspection.c.id,
            inspection.c.department_id,
            inspection.c.date,
            inspection.c.check_list_id,
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
            department_group.c.name,
        )
    )

    inspection_summary = await database.fetch_one(inspection_summary_query)

    if not inspection_summary:
        return None
    
    result_calculation = ResultCalculation(inspection_id)
    inspection_result = await result_calculation.get_inspection_result()
    total_result = await result_calculation.get_result()

    employee_result_calculation = EmployeeResultCalculation(inspection_id)
    employees_result = await employee_result_calculation.get_result()

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
        "employees_result": employees_result,
        "check_list_id": inspection_summary["check_list_id"],
        "total_result": total_result,
    }

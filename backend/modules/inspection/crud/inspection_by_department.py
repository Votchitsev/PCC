from fastapi import APIRouter
from sqlalchemy import select

from ..models.tables import inspection
from modules.departments.models.tables import department, department_group
from modules.employees.models.tables import profile, position, responsibility_department_group
from db.database import database



router = APIRouter(
    prefix="/department",
)


@router.get("/", summary="Получение списка проверок по подразделению")
async def get_inspection_by_department(department_id: int, limit: int = 10):
    inspections_query = (
        inspection.select()
            .where(inspection.c.department_id == department_id)
            .order_by(inspection.c.date.desc())
            .limit(limit)
    )

    inspections = await database.fetch_all(inspections_query)

    department_query = (
        select(
            department.c.name.label("department"),
            department_group.c.name.label("department_group"),
        )
        .join(department_group, department.c.department_group_id == department_group.c.id)
        .where(department.c.id == department_id)
        .group_by(
            department.c.name,
            department_group.c.name
        )
    )

    department_info = await database.fetch_one(department_query)

    employees_query = (
        select(
            profile.c.first_name,
            profile.c.last_name,
            position.c.name.label("position"),
        )
        .join(position, profile.c.position_id == position.c.id)
        .join(responsibility_department_group, position.c.id == responsibility_department_group.c.position_id)
        .join(department_group, responsibility_department_group.c.department_group_id == department_group.c.id)
        .join(department, department_group.c.id == department.c.department_group_id)
        .where(
            department.c.id == department_id,
        )
        .group_by(
            profile.c.first_name,
            profile.c.last_name,
            position.c.name
        )
    )

    employees = await database.fetch_all(employees_query)

    return {
        "department": department_info["department"],
        "department_group": department_info["department_group"],
        "inspections": inspections,
        "employees": employees,
    }

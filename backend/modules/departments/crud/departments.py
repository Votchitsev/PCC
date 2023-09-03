from fastapi import APIRouter, Depends, HTTPException
from db.database import database
from ..models.tables import department, department_group
from modules.auth.utils.dependencies import get_current_user
from ..schemas.schemas import SDepartment


router = APIRouter(
  prefix="/department",
)


@router.post('/', summary="Создание подразделения")
async def create(department_data: SDepartment, _ = Depends(get_current_user)):
    """Create a department"""
    
    try:

        check_exists_query = (
            department.select()
                .where(department.c.name == department_data.name)
        )

        existing_department = await database.fetch_one(check_exists_query)

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")

    if existing_department:
        raise HTTPException(status_code=400, detail="DEPARTMENT_EXISTS")

    department_group_query = (
        department_group.select()
            .where(department_group.c.id == department_data.department_group_id)
    )

    selected_department_group = await database.fetch_one(department_group_query)

    if not selected_department_group:
        raise HTTPException(status_code=400, detail="DEPARTMENT_GROUP_NOT_EXISTS")

    create_query = (
        department.insert()
            .values(
                name=department_data.name,
                department_group_id=selected_department_group.id,
                )
            .returning(department)
        )

    created_department = await database.execute(create_query)

    return created_department


@router.get('/', summary="Получение всех подразделений")
async def get():
    """Get all departments"""

    try:
        query = (
            department.select()
                .order_by(department.c.id)
        )

        response = await database.fetch_all(query)

        return response;

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")


@router.put('/{id}', summary="Изменение подразделения")
async def put(id: int, department_data: SDepartment, _ = Depends(get_current_user)):
    """Change a department"""

    check_exists_query = (
        department.select()
            .where(department.c.name == department_data.name)
    )

    existing_department = await database.fetch_one(check_exists_query)

    if existing_department:
        raise HTTPException(status_code=400, detail="DEPARTMENT_EXISTS")

    update_query = (
        department.update()
            .where(department.c.id == id)
            .values(
                name=department_data.name,
                department_group_id=department_data.department_group_id
            )
            .returning(department)
    )

    updated_department = await database.execute(update_query)

    return updated_department


@router.delete('/{id}', summary="Удаление подразделения")
async def delete(id: int, _ = Depends(get_current_user)):
    """Delete a department"""

    delete_query = (
        department.delete()
            .where(department.c.id == id)
    )

    await database.execute(delete_query)

    return

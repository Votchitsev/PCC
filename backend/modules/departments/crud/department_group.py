from fastapi import APIRouter, Depends, HTTPException
from modules.auth.utils.dependencies import get_current_user
from db.database import database
from ..models.tables import department, department_group


router = APIRouter(
  prefix="/department_groups",
)


@router.post('/', summary="Создание группы подразделений")
async def create(name: str, _ = Depends(get_current_user)):
    """Create a department group"""
    
    try:
        create_query = (
            department_group.insert()
                .values(name=name)
                .returning(department_group)
        )

        department_group_id = await database.execute(create_query)

        return {
            "id": department_group_id,
            "name": name
        }

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")


@router.get('/', summary="Получение всех групп подразделений")
async def get():
    """Get all department groups"""
    try:
        query = (
            department_group.select()
                .order_by(department_group.c.id)
        )

        response = await database.fetch_all(query)

        return response;

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")


@router.get('/{id}', summary="Получение информации о группе подразделений")
async def get(id: int):
    """Get a department group by id"""
    try:
        query = (
            department_group.select()
                .where(department_group.c.id == id)
        )

        group = await database.fetch_one(query)

        departments_query = (
            department.select()
                .where(department.c.department_group_id == id)
        )

        departments = await database.fetch_all(departments_query)

        return {
            "id": group["id"],
            "name": group["name"],
            "departments": departments,
        }

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")


@router.put('/{id}', summary="Изменение группы подразделений")
async def put(id: int, name: str, _ = Depends(get_current_user)):
    """Change a department group"""
    try:
        update_query = (
            department_group.update()
                .where(department_group.c.id == id)
                .values(name=name)
        )

        await database.execute(update_query)

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")
    

@router.delete('/{id}', summary="Удаление группы подразделений")
async def delete(id: int, _ = Depends(get_current_user)):
    """Delete a department group"""
    contains_departments_query = (
        department.select()
            .where(department.c.department_group_id == id)
    )

    contains_departments = await database.fetch_all(contains_departments_query)

    if contains_departments:
        raise HTTPException(status_code=400, detail="DEPARTMENTS_EXISTS")

    try:
        delete_query = (
            department_group.delete()
                .where(department_group.c.id == id)
        )

        await database.execute(delete_query)

    except:
        raise HTTPException(status_code=500, detail="UNKNOWN_ERROR")

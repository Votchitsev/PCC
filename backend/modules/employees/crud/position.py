from fastapi import APIRouter
from ..models.tables import position
from db.database import database
from ..schemas.position import SPosition


router = APIRouter(
    prefix="/positions",
)


@router.post("/", summary="Создание должности")
async def create_position(data: SPosition):
    create_position_query = (
        position.insert()
            .values(name=data.name)
            .returning(position)
    )

    return await database.execute(create_position_query)


@router.get("/", summary="Получение всех должностей")
async def get_all_Positions():
    query = (
        position.select()
            .order_by(position.c.id)
    )

    return await database.fetch_all(query)


@router.get("/{id}", summary="Получение информации о должности")
async def get_position_by_id(id: int):
    query = (
        position.select()
            .where(position.c.id == id)
    )

    return await database.fetch_one(query)


@router.put("/{id}", summary="Изменение должности")
async def update_position(id: int, data: SPosition):
    update_query = (
        position.update()
            .where(position.c.id == id)
            .values(name=data.name)
    )

    await database.execute(update_query)


@router.delete("/{id}", summary="Удаление должности")
async def delete_position(id: int):
    delete_query = (
        position.delete()
            .where(position.c.id == id)
    )

    await database.execute(delete_query)

    return "OK"

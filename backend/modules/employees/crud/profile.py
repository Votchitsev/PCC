from fastapi import APIRouter
from ..schemas.profile import SProfile
from ..models.tables import profile
from db.database import database


router = APIRouter(
    prefix="/profile",
)


@router.post("/", summary="Создание профиля")
async def create_profile(data: SProfile):
    create_profile_query = (
        profile.insert()
            .values(
                first_name=data.first_name,
                last_name=data.last_name,
                position_id=data.position_id
            )
            .returning(profile)
    )

    return await database.execute(create_profile_query)


@router.get("/{id}", summary="Получение информации о профиле")
async def get_profile_by_id(id: int):
    query = (
        profile.select()
            .where(profile.c.id == id)
    )

    return await database.fetch_one(query)


@router.put("/{id}", summary="Изменение профиля")
async def update_profile(id: int, data: SProfile):
    update_query = (
        profile.update()
            .where(profile.c.id == id)
            .values(
                first_name=data.first_name,
                last_name=data.last_name,
                position_id=data.position_id
            )
            .returning(profile)
    )

    return await database.execute(update_query)


@router.delete("/{id}", summary="Удаление профиля")
async def delete_profile(id: int):
    delete_query = (
        profile.delete()
            .where(profile.c.id == id)
    )

    return await database.execute(delete_query)

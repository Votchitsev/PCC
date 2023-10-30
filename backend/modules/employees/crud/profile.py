from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from modules.auth.schemas import User
from modules.auth.models.tables import users
from ..schemas.profile import SProfile
from ..models.tables import profile
from db.database import database
from modules.auth.utils.dependencies import get_current_user


router = APIRouter(
    prefix="/profile",
)


@router.post("/", summary="Создание профиля")
async def create_profile(data: SProfile):
    user_query = (
        users.select()
            .where(users.c.id == data.user_id)        
    )

    user = await database.fetch_one(user_query)

    if not user:
        raise HTTPException(status_code=400, detail="USER_NOT_EXISTS")
    
    profile_id = None
    
    if user["profile_id"]:
        change_profile_query = (
            profile.update()
                .where(profile.c.id == user["profile_id"])
                .values(
                    first_name=data.first_name,
                    last_name=data.last_name,
                    position_id=data.position_id
                )
        )

        await database.execute(change_profile_query)
        profile_id = user["profile_id"]
    
    else:
        create_profile_query = (
            profile.insert()
                .values(
                    first_name=data.first_name,
                    last_name=data.last_name,
                    position_id=data.position_id
                )
                .returning(profile)
        )

        profile_id = await database.execute(create_profile_query)

    user_update_query = (
        users.update()
            .where(users.c.id == data.user_id)
            .values(profile_id=profile_id)
        )
    
    await database.execute(user_update_query)

    return True


@router.get("/{id}", summary="Получение информации о профиле")
async def get_profile_by_id(id: int, token_id: User = Depends(get_current_user)):
    query = (
        select(
            users.c.id,
            profile.c.first_name,
            profile.c.last_name,
            profile.c.position_id
        )
            .join(profile, users.c.profile_id == profile.c.id)
            .where(users.c.id == id)
            .group_by(
                users.c.id,
                profile.c.first_name,
                profile.c.last_name,
                profile.c.position_id
            )
    )

    result = await database.fetch_one(query)

    return result


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

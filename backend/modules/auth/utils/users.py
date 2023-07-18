import hashlib
import random
import string
from pydantic import BaseModel
from sqlalchemy import and_
from db.database import database
from modules.auth.models.tables import users, tokens
from ..schemas import SignUpData


def get_random_string(length=12):
    """ Генерирует случайную строку, использующуюся как соль """
    return "".join(random.choice(string.ascii_letters) for _ in range(length))


def hash_password(password: str, salt: str = None):
    """ Хэширует пароль с солью """
    if salt is None:
        salt = get_random_string()
    enc = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100_100)
    return enc.hex()


def validate_password(password: str, hashed_password: str):
    """ Проверяет, что хеш пароля совпадает с хешем из БД """
    salt, hashed = hashed_password.split("$")
    return hash_password(password, salt) == hashed


async def get_user_by_name(username: str):
    """ Возвращает информацию о пользователе """
    query = users.select().where(users.c.username == username)
    return await database.fetch_one(query)


async def get_user_by_token(token: str):
    """ Возвращает информацию о владельце указанного токена """
    query = tokens.join(users).select().where(
        and_(
            tokens.c.token == token,
        )
    )

    return await database.fetch_one(query)


async def create_user_token(user_id: int):
    """ Создает токен для пользователя с указанным user_id """
    query = (
        tokens.insert()
        .values(user_id=user_id)
        .returning(tokens.c.token)
    )

    return await database.fetch_one(query)


async def create_user(user: SignUpData):
    """ Создает нового пользователя в БД """
    salt = get_random_string()

    hashed_password = hash_password(user.password, salt)

    query = users.insert().values(
        username=user.username, password=f"{salt}${hashed_password}"
    )

    user_id = await database.execute(query)
    token = await create_user_token(user_id)
    token_dict = {"token": token["token"]}

    return {"id": user_id, "username": user.username, "token": token_dict["token"]}

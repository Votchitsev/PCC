import asyncio
from os import environ
import os

from modules.auth.utils.users import create_user
from db.database import database


class User:
    def __init__(self) -> None:
        self.username = environ.get("SUPERUSER_NAME", "admin")
        self.password = environ.get("SUPERUSER_PASSWORD", "admin")
        self.confirmPassword = self.password


async def init():
    await database.connect()

    while not database.is_connected:
        await asyncio.sleep(1)

    await database.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    os.system('alembic upgrade head')
    user = User()
    await create_user(user)
    os.system('./run.sh')
    await database.disconnect()


asyncio.run(init())

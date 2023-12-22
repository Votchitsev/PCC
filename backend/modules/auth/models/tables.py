import sqlalchemy
from sqlalchemy.dialects.postgresql import UUID

from modules.employees.models.tables import profile


metadata = sqlalchemy.MetaData()


users = sqlalchemy.Table(
    "users", 
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String(22), unique=True),
    sqlalchemy.Column("password", sqlalchemy.String()),
    sqlalchemy.Column("profile_id", sqlalchemy.ForeignKey(profile.c.id, back_populates="user")),
)

tokens = sqlalchemy.Table(
    "tokens",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column(
        "token",
        UUID(as_uuid=False),
        server_default=sqlalchemy.text("uuid_generate_v4()"),
        unique=True,
        nullable=False,
        index=True,
    ),
    sqlalchemy.Column("user_id", sqlalchemy.ForeignKey("users.id"))
)

import sqlalchemy
from  sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint

from modules.departments.models.tables import department, department_group
from modules.check_list.models.tables import questions


metadata = sqlalchemy.MetaData()


position = sqlalchemy.Table(
    "position",
    metadata,
    Column("id", sqlalchemy.Integer, primary_key=True),
    Column("name", sqlalchemy.String()),
)


profile = sqlalchemy.Table(
    "profile",
    metadata,
    Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    Column("first_name", sqlalchemy.String()),
    Column("last_name", sqlalchemy.String()),
    Column("position_id", Integer, ForeignKey(position.c.id)),
)


responsibility_question = sqlalchemy.Table(
    "responsibility_question",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("question_id", ForeignKey(questions.c.id)),
    Column("position_id", ForeignKey(position.c.id)),
)


responsibility_department_group = sqlalchemy.Table(
    "responsibility_department_group",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_group_id", ForeignKey(department_group.c.id)),
    Column("position_id", ForeignKey(position.c.id)),
)


responsibility_department = sqlalchemy.Table(
    "responsibility_department",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_id", ForeignKey(department.c.id)),
    Column("position_id", ForeignKey(position.c.id)),
)

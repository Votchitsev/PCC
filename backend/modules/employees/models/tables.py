import sqlalchemy
from  sqlalchemy import Column, ForeignKey, Integer

# from modules.auth.models.tables import users
from modules.departments.models.tables import department, department_group
from modules.check_list.models.tables import questions


metadata = sqlalchemy.MetaData()


position = sqlalchemy.Table(
    "position",
    metadata,
    Column("id", sqlalchemy.Integer, primary_key=True),
    Column("name", sqlalchemy.String()),
    Column(
        "responsibility_question_id",
        Integer,
        ForeignKey("responsibility_question.id")
    ),
    Column(
        "responsibility_department_group_id",
        Integer,
        ForeignKey("responsibility_department_group.id")
        ),
    Column(
        "responsibility_department_id",
        Integer,
        ForeignKey("responsibility_department.id")
    )
)


profile = sqlalchemy.Table(
    "profile",
    metadata,
    Column("id", sqlalchemy.Integer, primary_key=True),
    Column("first_name", sqlalchemy.String()),
    Column("last_name", sqlalchemy.String()),
    Column("position_id", Integer, ForeignKey(position.c.id)),
)


responsibility_question = sqlalchemy.Table(
    "responsibility_question",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("question_id", ForeignKey(questions.c.id)),
)


responsibility_department_group = sqlalchemy.Table(
    "responsibility_department_group",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_group_id", ForeignKey(department_group.c.id)),
)


responsibility_department = sqlalchemy.Table(
    "responsibility_department",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_id", ForeignKey(department.c.id)),
)

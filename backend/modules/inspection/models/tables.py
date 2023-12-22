from sqlalchemy import Column, Integer, Table, MetaData, ForeignKey, Date, Boolean, UniqueConstraint

from modules.departments.models.tables import department
from modules.employees.models.tables import profile
from modules.check_list.models.tables import questions, check_list
from modules.auth.models.tables import users


metadata = MetaData()

inspection = Table(
    "inspection",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("department_id", Integer, ForeignKey(department.c.id)),
    Column("date", Date),
    Column("check_list_id", Integer, ForeignKey(check_list.c.id)),
    Column("total_result", Integer),
    Column("user_id", Integer, ForeignKey(users.c.id)),
)


inspection_question = Table(
    "inspection_question",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("question_id", Integer, ForeignKey(questions.c.id)),
    Column("inspection_id", Integer, ForeignKey("inspection.id")),
    Column("result", Boolean),
    UniqueConstraint("question_id", "inspection_id"),
)


employee_result = Table(
  "employee_result",
  metadata,
  Column("id", Integer, primary_key=True, autoincrement=True),
  Column("profile_id", Integer, ForeignKey(profile.c.id)),
  Column("inspection_id", Integer, ForeignKey("inspection.id")),
  Column("result", Integer),
)

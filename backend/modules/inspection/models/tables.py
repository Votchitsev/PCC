from sqlalchemy import Column, Integer, String, Table, MetaData, ForeignKey, Date, Boolean

from modules.departments.models.tables import department
from modules.employees.models.tables import profile
from modules.check_list.models.tables import questions


metadata = MetaData()

inspection = Table(
    "inspection",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("department_id", Integer, ForeignKey(department.c.id)),
    Column("date", Date),
    Column("total_result", Integer),
)


inspection_question = Table(
    "inspection_question",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("question_id", Integer, ForeignKey(questions.c.id)),
    Column("inspection_id", Integer, ForeignKey("inspection.id")),
    Column("result", Boolean),
)


employee_result = Table(
  "employee_result",
  metadata,
  Column("id", Integer, primary_key=True),
  Column("profile_id", Integer, ForeignKey(profile.c.id)),
  Column("inspection_id", Integer, ForeignKey("inspection.id")),
  Column("result", Integer),
)
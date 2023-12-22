import sqlalchemy


metadata = sqlalchemy.MetaData()


check_list = sqlalchemy.Table(
    "check_list",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("name", sqlalchemy.String(), unique=True),
    sqlalchemy.Column("total_grade", sqlalchemy.Integer),
)


questions = sqlalchemy.Table(
    "questions",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("text", sqlalchemy.String()),
    sqlalchemy.Column("grade", sqlalchemy.Integer),
    sqlalchemy.Column("check_list_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("check_list.id")),
    sqlalchemy.Column("parent_question_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("questions.id")),
    sqlalchemy.Column("order", sqlalchemy.Integer),
)

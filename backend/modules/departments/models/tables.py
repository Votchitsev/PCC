import sqlalchemy


metadata = sqlalchemy.MetaData()


department = sqlalchemy.Table(
    "department",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String(), unique=True),
    sqlalchemy.Column(
        "department_group_id",
        sqlalchemy.Integer,
        sqlalchemy.ForeignKey("department_group.id")
    ),
)


department_group = sqlalchemy.Table(
    "department_group",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String(), unique=True),
)

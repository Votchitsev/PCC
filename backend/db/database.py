from os import environ
import databases


DB_USER = environ.get("DB_USER", "pcc_admin")
DB_PASSWORD = environ.get("DB_PASSWORD", "password")
DB_HOST = environ.get("DB_HOST", "localhost")
DB_NAME = environ.get("DB_NAME", "PCC")
DB_PORT = environ.get("DB_PORT", "5432")

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


database = databases.Database(SQLALCHEMY_DATABASE_URL)

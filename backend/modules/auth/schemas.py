from pydantic import BaseModel


class SignInData(BaseModel):
    username: str
    password: str


class User(BaseModel):
    id: int
    username: str


class SignUpData(BaseModel):
    username: str
    password: str
    confirmPassword: str

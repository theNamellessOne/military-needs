from pydantic import BaseModel, EmailStr
from user.model import Role
from common.schema import OrmBase


class UserRead(OrmBase):
    id: int
    role: Role
    contact_info: str
    name: str
    email: EmailStr


class UserBase(BaseModel):
    email: EmailStr
    password: str


class UserLogin(UserBase):
    pass


class UserRegister(UserBase):
    role: Role
    contact_info: str
    name: str


class UserUpdate(UserRegister):
    pass

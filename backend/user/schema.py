from pydantic import BaseModel, EmailStr
from user.model import Role
from common.schema import OrmBase


class UserRead(OrmBase):
    id: int
    role: Role
    contact_info: str
    email: EmailStr


class UserBase(BaseModel):
    email: EmailStr
    contact_info: str
    password: str


class UserLogin(UserBase):
    pass


class UserRegister(UserBase):
    role: Role


class UserUpdate(UserRegister):
    pass

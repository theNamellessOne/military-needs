from sqlalchemy import Column, Integer, String, Enum
from database import Base
from enum import Enum as NEnum


class Role(NEnum):
    SOLDIER = "soldier"
    VOLUNTEER = "volunteer"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, unique=False, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    role = Column(Enum(Role))

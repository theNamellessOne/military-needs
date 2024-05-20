from fastapi import Depends
from sqlalchemy.orm import Session
from typing import Optional

from database import get_db
from user.model import User
from util.filtering import search_and_sort

from need.model import Need
from need.schema import NeedCreate, NeedUpdate


class NeedRepository:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_by_id(self, need_id: int):
        return (self.session.query(Need)
                .filter(Need.id == need_id)
                .outerjoin(User, User.id == Need.user_id)
                .first())

    def fetch(self,
              page_size: int,
              page: int,
              search_query: Optional[str] = None,
              sort_by: Optional[str] = None,
              sort_direction: Optional[str] = None):
        return search_and_sort(self.session,
                               Need,
                               search_query,
                               sort_by,
                               page,
                               page_size,
                               sort_direction)

    def create(self, entity: NeedCreate):
        db_need = Need(**entity.model_dump())

        self.session.add(db_need)
        self.session.commit()
        self.session.refresh(db_need)

        return db_need

    def update(self,
               need_id: int,
               need_update: NeedUpdate):
        db_need = self.get_by_id(need_id)
        if not db_need:
            return None

        for var, value in vars(need_update).items():
            setattr(db_need, var, value)

        self.session.commit()
        self.session.refresh(db_need)

        return db_need

    def delete(self, item_id: int):
        db_need = self.get_by_id(item_id)

        if not db_need:
            return None

        self.session.delete(db_need)
        self.session.commit()

        return db_need


def get_need_repository(db: Session = Depends(get_db)):
    return NeedRepository(db)

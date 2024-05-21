from http import HTTPStatus

from fastapi import Depends, HTTPException
from typing import Optional

from need.repository import NeedRepository, get_need_repository
from need.schema import NeedCreate, NeedUpdate, NeedRead, NeedPage, NeedList
from util.decorators import with_error_logger


class NeedService:
    def __init__(self, repo: Depends(get_need_repository)) -> None:
        self.need_repository = repo

    @with_error_logger
    def get_by_id(self, need_id: int):
        db_need = self.need_repository.get_by_id(need_id)

        if db_need is None:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND,
                                detail=f"Need with id: {need_id} not found")

        return NeedRead.from_orm(db_need)

    @with_error_logger
    def fetch(self,
              page_size: int,
              page: int,
              search_query: Optional[str] = None,
              sort_by: Optional[str] = None,
              sort_direction: Optional[str] = None):
        db_page = self.need_repository.fetch(
            page_size, page, search_query, sort_by, sort_direction)
        return NeedPage.from_orm(db_page)

    @with_error_logger
    def get_by_user_id(self, user_id: int):
        db_needs = self.need_repository.get_by_user_id(user_id=user_id)
        return NeedList.from_orm({'items': db_needs})

    @with_error_logger
    def create(self, entity: NeedCreate):
        db_need = self.need_repository.create(entity)
        return NeedRead.from_orm(db_need)

    @with_error_logger
    def replacement_update(self,
                           need_id: int,
                           need_update: NeedUpdate):
        db_need = self.need_repository.update(need_id, need_update)

        if db_need is None:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND,
                                detail=f"Need with id: {need_id} not found")

        return NeedRead.from_orm(db_need)

    @with_error_logger
    def patch_update(self,
                     need_id: int,
                     need_update: NeedUpdate):
        db_need = self.need_repository.get_by_id(need_id)

        if db_need is None:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND,
                                detail=f"Need with id: {need_id} not found")

        for field, value in need_update.dict(exclude_unset=True).items():
            setattr(db_need, field, value)

        db_need = self.need_repository.update(need_id, db_need)

        return NeedRead.from_orm(db_need)

    @with_error_logger
    def delete(self, item_id: int):
        db_need = self.need_repository.delete(item_id)
        return NeedRead.from_orm(db_need)


def get_need_service(repo: NeedRepository = Depends(get_need_repository)):
    return NeedService(repo)

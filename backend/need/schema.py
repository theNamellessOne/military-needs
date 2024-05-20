from typing import List

from pydantic import Field

from common.schema import TimestampMixin, OrmBase
from user.schema import UserRead


class NeedBase(OrmBase):
    name: str = Field(min_length=1, max_length=255)
    description: str = Field(min_length=1, max_length=1023)


class NeedRead(NeedBase, TimestampMixin):
    id: int
    user: UserRead


class NeedPage(OrmBase):
    items: List[NeedRead]
    current_page: int
    total_pages: int


class NeedCreate(NeedBase):
    user_id: int


class NeedUpdate(NeedBase):
    pass

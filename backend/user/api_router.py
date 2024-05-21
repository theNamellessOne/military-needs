from http import HTTPStatus
from fastapi import APIRouter, Depends, Query, HTTPException
from user.schema import UserUpdate
from user.service import UserService, get_user_service
from common.schema import ApiResponse
from util.decorators import with_api_exception_handling
from auth.filter import with_auth

router = APIRouter()


@router.get("/", response_model=ApiResponse)
@with_api_exception_handling
def fetch(query: str = Query(default=None),
          sort_by: str = Query(default=None),
          sort_direction: str = Query(default="asc"),
          page_size: int = Query(default=10),
          page_number: int = Query(default=1),
          user_service: UserService = Depends(get_user_service),
          _=Depends(with_auth())):
    data = user_service.fetch(
        page_size, page_number, query, sort_by, sort_direction)
    return ApiResponse(status=HTTPStatus.OK, data=data)


@router.get("/{user_id}", response_model=ApiResponse)
@with_api_exception_handling
def get_by_id(user_id: int,
              user_service: UserService = Depends(get_user_service),
              _=Depends(with_auth())):
    data = user_service.get_by_id(user_id)
    return ApiResponse(status=HTTPStatus.OK, data=data)


@router.put("/{user_id}", response_model=ApiResponse)
@with_api_exception_handling
def replace(user_id: int,
            entity: UserUpdate,
            user_service: UserService = Depends(get_user_service),
            principal=Depends(with_auth())):
    if principal['id'] != user_id:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                            detail="Not enought priviliges")

    return ApiResponse(status=HTTPStatus.OK, data=user_service.replacement_update(user_id, entity))


@router.patch("/{user_id}", response_model=ApiResponse)
@with_api_exception_handling
def patch(user_id: int,
          entity: UserUpdate,
          user_service: UserService = Depends(get_user_service),
          principal=Depends(with_auth())):
    if principal['id'] != user_id:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                            detail="Not enought priviliges")

    return ApiResponse(status=HTTPStatus.OK, data=user_service.patch_update(user_id, entity))

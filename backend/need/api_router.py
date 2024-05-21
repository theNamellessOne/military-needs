from http import HTTPStatus
from fastapi import APIRouter, Depends, Query, HTTPException
from need.schema import NeedUpdate, NeedCreateRequest, NeedCreate
from need.service import NeedService, get_need_service
from common.schema import ApiResponse
from user.model import Role
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
          need_service: NeedService = Depends(get_need_service),
          _=Depends(with_auth())):
    data = need_service.fetch(
        page_size, page_number, query, sort_by, sort_direction)
    return ApiResponse(status=HTTPStatus.OK, data=data)


@router.get("/{need_id}", response_model=ApiResponse)
@with_api_exception_handling
def get_by_id(need_id: int,
              need_service: NeedService = Depends(get_need_service),
              _=Depends(with_auth())):
    data = need_service.get_by_id(need_id)
    return ApiResponse(status=HTTPStatus.OK, data=data)


@router.get("/by/{user_id}", response_model=ApiResponse)
@with_api_exception_handling
def get_by_user_id(user_id: int,
                   need_service: NeedService = Depends(get_need_service),
                   _=Depends(with_auth())):
    data = need_service.get_by_user_id(user_id)
    return ApiResponse(status=HTTPStatus.OK, data=data)


@router.post("/", response_model=ApiResponse)
@with_api_exception_handling
def create(entity: NeedCreateRequest,
           need_service: NeedService = Depends(get_need_service),
           principal=Depends(with_auth(Role.SOLDIER))):
    data = NeedCreate(
        user_id=principal['id'],
        name=entity.name,
        description=entity.description
    )
    return ApiResponse(status=HTTPStatus.CREATED,
                       data=need_service.create(data))


@router.put("/{need_id}", response_model=ApiResponse)
@with_api_exception_handling
def replace(need_id: int,
            entity: NeedUpdate,
            need_service: NeedService = Depends(get_need_service),
            principal=Depends(with_auth(Role.SOLDIER))):
    need = need_service.get_by_id(need_id)
    if principal['id'] != need.user_id:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                            detail="Not enought priviliges")

    return ApiResponse(status=HTTPStatus.OK,
                       data=need_service.replacement_update(need_id, entity))


@router.patch("/{need_id}", response_model=ApiResponse)
@with_api_exception_handling
def patch(need_id: int,
          entity: NeedUpdate,
          need_service: NeedService = Depends(get_need_service),
          principal=Depends(with_auth(Role.SOLDIER))):
    need = need_service.get_by_id(need_id)
    if principal['id'] != need.user_id:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                            detail="Not enought priviliges")

    return ApiResponse(status=HTTPStatus.OK,
                       data=need_service.patch_update(need_id, entity))


@router.delete("/{need_id}", response_model=ApiResponse)
@with_api_exception_handling
def delete(need_id: int,
           need_service: NeedService = Depends(get_need_service),
           principal=Depends(with_auth(Role.SOLDIER))):
    need = need_service.get_by_id(need_id)
    if principal['id'] != need.user_id:
        raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                            detail="Not enought priviliges")

    return ApiResponse(status=HTTPStatus.OK, data=need_service.delete(need_id))

from http import HTTPStatus

from fastapi import Depends, HTTPException

from user.model import Role
from auth.auth_service import get_principal


def with_auth(role: Role = None):
    def validate(current_user=Depends(get_principal)):
        if not current_user:
            raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                                detail="Not authenticated")

        if role and current_user['role'] != role.value:
            raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                                detail="Not enought priviliges")

        return current_user

    return validate


def guest_only():
    def validate(current_user=Depends(get_principal)):
        if current_user:
            raise HTTPException(status_code=HTTPStatus.FORBIDDEN,
                                detail="Trying to access guest only route")

        return current_user

    return validate

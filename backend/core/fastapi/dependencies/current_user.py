from fastapi import Depends, Request

from module.user import UserController
from core.factory import Factory


async def get_current_user(
    request: Request,
    user_controller: UserController = Depends(Factory().get_user_controller),
):
    print("request.user.id:", request.user.id)
    return await user_controller.get_by_id(request.user.id)

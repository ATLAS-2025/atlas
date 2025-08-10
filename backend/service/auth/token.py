from pydantic import BaseModel
from module.user.user_schema_response import UserResponse


class Token(UserResponse):
    access_token: str
    refresh_token: str

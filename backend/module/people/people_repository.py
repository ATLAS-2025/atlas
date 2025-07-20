from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from . import People
from core.repository import BaseRepository


class PeopleRepository(BaseRepository[People]):
    """
    People repository provides all the database operations for the People model.
    """
    async def get_by_id(self, id: int, join_: set[str] | None = None) -> People | None:
        """
        Get user by username.

        :param username: Username.
        :param join_: Join relations.
        :return: User.
        """
        query = self._query(join_)
        query = query.filter(People.id == id)
        return await self._one_or_none(query)

    async def get_by_email(
        self, email: str, join_: set[str] | None = None
    ) -> People | None:
        """
        Get person by email.

        :param email: Email.
        :param join_: Join relations.
        :return: Person.
        """
        query = await self._query(join_)
        query = query.filter(People.email == email)
        return await self._one_or_none(query)

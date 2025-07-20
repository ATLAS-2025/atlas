from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from . import Document
from core.repository import BaseRepository


class DocumentRepository(BaseRepository[Document]):
    """
    Document repository provides all the database operations for the Document model.
    """
    async def get_by_id(self, id: int, join_: set[str] | None = None) -> Document | None:
        """
        Get user by username.

        :param username: Username.
        :param join_: Join relations.
        :return: User.
        """
        query = self._query(join_)
        query = query.filter(Document.id == id)
        return await self._one_or_none(query)

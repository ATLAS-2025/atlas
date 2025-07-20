from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from .camera_model import Camera
from core.repository import BaseRepository


class CameraRepository(BaseRepository[Camera]):
    """
    Camera repository provides all the database operations for the Camera model.
    """

    async def get_by_serial_number(
        self, serial_number: str, join_: set[str] | None = None
    ) -> Camera | None:
        """
        Get camera by serial number.

        :param serial_number: Serial number.
        :param join_: Join relations.
        :return: Camera.
        """
        query = await self._query(join_)
        query = query.filter(Camera.serial_number == serial_number)

        if join_ is not None:
            return await self.all_unique(query)

        return await self._one_or_none(query)
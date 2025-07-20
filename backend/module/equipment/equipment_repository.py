from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from . import Equipment
from core.repository import BaseRepository


class EquipmentRepository(BaseRepository[Equipment]):
    """
    Equipment repository provides all the database operations for the Equipment model.
    """

    async def get_by_serial_number(
        self, serial_number: str, join_: set[str] | None = None
    ) -> Equipment | None:
        """
        Get equipment by serial number.

        :param serial_number: Serial number.
        :param join_: Join relations.
        :return: Equipment.
        """
        query = self._query(join_)
        query = query.filter(Equipment.serial_number == serial_number)
        return await self._one_or_none(query)

    async def get_by_id(
        self, id: int, join_: set[str] | None = None
    ) -> Equipment | None:
        """
        Get equipment by serial number.

        :param serial_number: Serial number.
        :param join_: Join relations.
        :return: Equipment.
        """
        query = self._query(join_)
        query = query.filter(Equipment.id == id)
        return await self._one_or_none(query)

    async def update(self, equipment_id: int, equipment_data: dict) -> Equipment | None:
        """
        Update equipment by ID.

        :param equipment_id: Equipment ID.
        :param equipment_data: Equipment data to update.
        :return: Updated Equipment.
        """
        return await self.update(equipment_id, equipment_data)

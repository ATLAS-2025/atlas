from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from .sensor_model import Sensor
from core.repository import BaseRepository


class SensorRepository(BaseRepository[Sensor]):
    """
    Sensor repository provides all the database operations for the Sensor model.
    """

    async def get_by_serial_number(
        self, serial_number: str, join_: set[str] | None = None
    ) -> Sensor | None:
        """
        Get sensor by serial number.

        :param serial_number: Serial number.
        :param join_: Join relations.
        :return: Sensor.
        """
        query = self._query(join_)
        query = query.filter(Sensor.serial_number == serial_number)
        return await self._one_or_none(query)
    async def get_by_id(
        self, id: int, join_: set[str] | None = None
    ) -> Sensor | None:
        """
        Get Sensor by id number.

        :param serial_number: Serial number.
        :param join_: Join relations.
        :return: Sensor.
        """
        query = self._query(join_)
        query = query.filter(Sensor.id == id)
        return await self._one_or_none(query)

    async def update(self, sensor_id: int, sensor_data: dict) -> Sensor | None:
        """
        Update Sensor by ID.

        :param sensor_id: Sensor ID.
        :param sensor_data: SensorSensor data to update.
        :return: Updated Sensor.
        """
        return await self.update(sensor_id, sensor_data)

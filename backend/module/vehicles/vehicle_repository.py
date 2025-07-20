from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from app.vehicles.model_vehicle import Vehicle
from core.repository import BaseRepository


class VehicleRepository(BaseRepository[Vehicle]):
    """
    Vehicle repository provides all the database operations for the Vehicle model.
    """

    async def get_by_license_plate(
        self, license_plate: str, join_: set[str] | None = None
    ) -> Vehicle | None:
        """
        Get vehicle by license plate.

        :param license_plate: License plate.
        :param join_: Join relations.
        :return: Vehicle.
        """
        query = await self._query(join_)
        query = query.filter(Vehicle.license_plate == license_plate)

        if join_ is not None:
            return await self.all_unique(query)

        return await self._one_or_none(query)
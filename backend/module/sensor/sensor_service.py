from .sensor_model import Sensor
from .sensor_schema_request import SensorCreateRequest, SensorUpdateRequest
from .sensor_schema_response import SensorResponse
from .sensor_repository import SensorRepository
from core.database.transactional import Transactional

class SensorService:
    def __init__(self, sensor_repository: SensorRepository):
        self.sensor_repository = sensor_repository

    @Transactional()
    async def create_sensor(self, sensor_data: SensorCreateRequest) -> Sensor:
        sensor_dict = sensor_data.dict()
        if sensor_dict.get("calibration_date") and sensor_dict["calibration_date"].tzinfo is not None:
            sensor_dict["calibration_date"] = sensor_dict["calibration_date"].replace(tzinfo=None)
        return await self.sensor_repository.create(sensor_dict)

    async def get_sensor_by_id(self, sensor_id: int) -> Sensor | None:
        return await self.sensor_repository.get_by_id(sensor_id)

    async def get_sensor_by_serial_number(self, serial_number: str) -> Sensor | None:
        return await self.sensor_repository.get_by_serial_number(serial_number)

    async def get_all_sensors(self) -> list[Sensor]:
        return await self.sensor_repository.get_all()

    @Transactional()
    async def update_sensor(self, sensor_id: int, sensor_data: SensorUpdateRequest) -> Sensor | None:
        sensor_dict = sensor_data.dict(exclude_unset=True)
        if sensor_dict.get("calibration_date") and sensor_dict["calibration_date"].tzinfo is not None:
            sensor_dict["calibration_date"] = sensor_dict["calibration_date"].replace(tzinfo=None)
        return await self.sensor_repository.update(sensor_id, sensor_dict)

    @Transactional()
    async def delete_sensor(self, sensor_id: int) -> None:
        await self.sensor_repository.delete(sensor_id)

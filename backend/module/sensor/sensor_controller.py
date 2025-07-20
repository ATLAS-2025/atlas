from .sensor_model import Sensor
from .sensor_service import SensorService
from .sensor_schema_request import SensorCreateRequest, SensorUpdateRequest
from .sensor_schema_response import SensorResponse
from .sensor_repository import SensorRepository

from core.controller import BaseController
from .sensor_repository import SensorRepository

class SensorController(BaseController[Sensor]):
    def __init__(self, sensor_repository: SensorRepository, sensor_service: SensorService):
        super().__init__(model=Sensor, repository=sensor_repository)
        self.sensor_repository = sensor_repository
        self.sensor_service = sensor_service

    async def create_sensor(self, sensor_data: SensorCreateRequest) -> Sensor:
        return await self.sensor_service.create_sensor(sensor_data)

    async def get_sensor_by_id(self, sensor_id: int) -> Sensor:
        return await self.sensor_service.get_sensor_by_id(sensor_id)

    async def get_sensor_by_serial_number(self, serial_number: str) -> Sensor:
        return await self.sensor_service.get_sensor_by_serial_number(serial_number)

    async def update_sensor(self, sensor_id: int, sensor_data: SensorUpdateRequest) -> Sensor:
        return await self.sensor_service.update_sensor(sensor_id, sensor_data)

    async def delete_sensor(self, sensor_id: int) -> None:
        await self.sensor_service.delete_sensor(sensor_id)

    async def get_all_sensors(self):
        return await self.sensor_service.get_all_sensors()

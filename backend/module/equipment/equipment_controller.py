from .equipment_model import Equipment
from .equipment_service import EquipmentService
from .equipment_schema_request import (
    EquipmentCreateRequest,
    EquipmentUpdateRequest,
)
from .equipment_schema_response import EquipmentResponse
from core.controller import BaseController
from .equipment_repository import EquipmentRepository

class EquipmentController(BaseController[Equipment]):
    def __init__(self, equipment_repository: EquipmentRepository, equipment_service: EquipmentService):
        super().__init__(model=Equipment, repository=equipment_repository)
        self.equipment_repository = equipment_repository
        self.equipment_service = equipment_service

    async def create_equipment(self, equipment_data: EquipmentCreateRequest) -> Equipment:
        return await self.equipment_service.create_equipment(equipment_data)

    async def get_equipment_by_id(self, equipment_id: int) -> Equipment:
        return await self.equipment_service.get_equipment_by_id(equipment_id)

    async def get_equipment_by_serial_number(self, serial_number: str) -> Equipment:
        return await self.equipment_service.get_equipment_by_serial_number(serial_number)

    async def update_equipment(self, equipment_id: int, equipment_data: EquipmentUpdateRequest) -> Equipment:
        return await self.equipment_service.update_equipment(equipment_id, equipment_data)

    async def delete_equipment(self, equipment_id: int) -> None:
        await self.equipment_service.delete_equipment(equipment_id)

    async def get_all_equipment(self) -> list[Equipment]:
        return await self.equipment_service.get_all_equipment()

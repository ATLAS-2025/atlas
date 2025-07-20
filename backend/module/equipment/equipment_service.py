from .equipment_model import Equipment
from .equipment_schema_request import (
    EquipmentCreateRequest,
    EquipmentUpdateRequest,
)
from .equipment_repository import EquipmentRepository
from core.database.transactional import Transactional

class EquipmentService:
    def __init__(self, equipment_repository: EquipmentRepository):
        self.equipment_repository = equipment_repository

    @Transactional()
    async def create_equipment(self, equipment_data: EquipmentCreateRequest) -> Equipment:
        return await self.equipment_repository.create(equipment_data.dict())

    async def get_equipment_by_id(self, equipment_id: int) -> Equipment | None:
        return await self.equipment_repository.get_by_id(equipment_id)

    async def get_equipment_by_serial_number(self, serial_number: str) -> Equipment | None:
        return await self.equipment_repository.get_by_serial_number(serial_number)

    @Transactional()
    async def update_equipment(self, equipment_id: int, equipment_data: EquipmentUpdateRequest) -> Equipment | None:
        return await self.equipment_repository.update(equipment_id, equipment_data.dict(exclude_unset=True))

    @Transactional()
    async def delete_equipment(self, equipment_id: int) -> None:
        await self.equipment_repository.delete(equipment_id)

    async def get_all_equipment(self) -> list[Equipment]:
        return await self.equipment_repository.get_all()

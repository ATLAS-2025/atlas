from app.vehicles.model_vehicle import Vehicle
from app.vehicles.repositories_vehicle import VehicleRepository
from app.vehicles.schema_request_vehicles import VehicleCreateRequest, VehicleUpdateRequest
from core.database.transactional import Transactional

class VehicleService:
    def __init__(self, vehicle_repository: VehicleRepository):
        self.vehicle_repository = vehicle_repository

    @Transactional()
    async def create_vehicle(self, vehicle_data: VehicleCreateRequest) -> Vehicle:
        return await self.vehicle_repository.create(vehicle_data.model_dump())

    async def get_vehicle_by_id(self, vehicle_id: int) -> Vehicle | None:
        return await self.vehicle_repository.get_by_id(vehicle_id)

    async def get_vehicle_by_license_plate(self, license_plate: str) -> Vehicle | None:
        return await self.vehicle_repository.get_by_license_plate(license_plate)

    @Transactional()
    async def update_vehicle(self, vehicle_id: int, vehicle_data: VehicleUpdateRequest) -> Vehicle | None:
        return await self.vehicle_repository.update(vehicle_id, vehicle_data.model_dump(exclude_unset=True))

    @Transactional()
    async def delete_vehicle(self, vehicle_id: int) -> None:
        await self.vehicle_repository.delete(vehicle_id)
from app.vehicles.model_vehicle import Vehicle
from app.vehicles.service_vehicle import VehicleService
from app.vehicles.schema_request_vehicles import VehicleCreateRequest, VehicleUpdateRequest
from app.vehicles.schema_response_vehicles import VehicleResponse
from core.controller import BaseController
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

router = APIRouter()

class VehicleController(BaseController[Vehicle]):
    def __init__(self, vehicle_service: VehicleService):
        super().__init__(model=Vehicle, service=vehicle_service)
        self.vehicle_service = vehicle_service

    @router.post("/", response_model=VehicleResponse, status_code=status.HTTP_201_CREATED)
    async def create_vehicle(self, vehicle_data: VehicleCreateRequest):
        return await self.vehicle_service.create_vehicle(vehicle_data)

    @router.get("/{vehicle_id}", response_model=VehicleResponse)
    async def get_vehicle(self, vehicle_id: int):
        vehicle = await self.vehicle_service.get_vehicle_by_id(vehicle_id)
        if not vehicle:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
        return vehicle

    @router.get("/license_plate/{license_plate}", response_model=VehicleResponse)
    async def get_vehicle_by_license_plate(self, license_plate: str):
        vehicle = await self.vehicle_service.get_vehicle_by_license_plate(license_plate)
        if not vehicle:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
        return vehicle

    @router.put("/{vehicle_id}", response_model=VehicleResponse)
    async def update_vehicle(self, vehicle_id: int, vehicle_data: VehicleUpdateRequest):
        vehicle = await self.vehicle_service.update_vehicle(vehicle_id, vehicle_data)
        if not vehicle:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Vehicle not found")
        return vehicle

    @router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete_vehicle(self, vehicle_id: int):
        await self.vehicle_service.delete_vehicle(vehicle_id)
        return {"message": "Vehicle deleted successfully"}

    @router.get("/", response_model=List[VehicleResponse])
    async def get_all_vehicles(self):
        return await self.vehicle_service.vehicle_repository.get_all()
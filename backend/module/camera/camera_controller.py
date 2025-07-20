from .camera_model import Camera
from .camera_service import CameraService
from .camera_schema_request import CameraCreateRequest, CameraUpdateRequest
from .camera_schema_respons import CameraResponse
from core.controller import BaseController
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

router = APIRouter()

class CameraController(BaseController[Camera]):
    def __init__(self, camera_service: CameraService):
        super().__init__(model=Camera, service=camera_service)
        self.camera_service = camera_service

    @router.post("/", response_model=CameraResponse, status_code=status.HTTP_201_CREATED)
    async def create_camera(self, camera_data: CameraCreateRequest):
        return await self.camera_service.create_camera(camera_data)

    @router.get("/{camera_id}", response_model=CameraResponse)
    async def get_camera(self, camera_id: int):
        camera = await self.camera_service.get_camera_by_id(camera_id)
        if not camera:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Camera not found")
        return camera

    @router.get("/serial/{serial_number}", response_model=CameraResponse)
    async def get_camera_by_serial_number(self, serial_number: str):
        camera = await self.camera_service.get_camera_by_serial_number(serial_number)
        if not camera:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Camera not found")
        return camera

    @router.put("/{camera_id}", response_model=CameraResponse)
    async def update_camera(self, camera_id: int, camera_data: CameraUpdateRequest):
        camera = await self.camera_service.update_camera(camera_id, camera_data)
        if not camera:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Camera not found")
        return camera

    @router.delete("/{camera_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete_camera(self, camera_id: int):
        await self.camera_service.delete_camera(camera_id)
        return {"message": "Camera deleted successfully"}

    @router.get("/", response_model=List[CameraResponse])
    async def get_all_cameras(self):
        return await self.camera_service.camera_repository.get_all()
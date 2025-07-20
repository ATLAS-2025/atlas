from .camera_model import Camera
from .camera_repository import CameraRepository
from .camera_schema_request import CameraCreateRequest, CameraUpdateRequest
from core.database.transactional import Transactional

class CameraService:
    def __init__(self, camera_repository: CameraRepository):
        self.camera_repository = camera_repository

    @Transactional()
    async def create_camera(self, camera_data: CameraCreateRequest) -> Camera:
        return await self.camera_repository.create(camera_data.model_dump())

    async def get_camera_by_id(self, camera_id: int) -> Camera | None:
        return await self.camera_repository.get_by_id(camera_id)

    async def get_camera_by_serial_number(self, serial_number: str) -> Camera | None:
        return await self.camera_repository.get_by_serial_number(serial_number)

    @Transactional()
    async def update_camera(self, camera_id: int, camera_data: CameraUpdateRequest) -> Camera | None:
        return await self.camera_repository.update(camera_id, camera_data.model_dump(exclude_unset=True))

    @Transactional()
    async def delete_camera(self, camera_id: int) -> None:
        await self.camera_repository.delete(camera_id)

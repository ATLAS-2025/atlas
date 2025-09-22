from .project_model import Project
from .project_service import ProjectService
from .project_schema_request import ProjectCreateRequest, ProjectUpdateRequest
from .project_repository import ProjectRepository
from core.controller import BaseController


class ProjectController(BaseController[Project]):
    def __init__(self, project_repository: ProjectRepository, project_service: ProjectService):
        super().__init__(model=Project, repository=project_repository)
        self.project_repository = project_repository
        self.project_service = project_service

    async def create_project(self, project_data: ProjectCreateRequest) -> Project:
        return await self.project_service.create_project(project_data)

    async def get_project_by_id(self, project_id: int) -> Project:
        return await self.project_service.get_project_by_id(project_id)

    async def update_project(self, project_id: int, project_data: ProjectUpdateRequest) -> Project:
        return await self.project_service.update_project(project_id, project_data)

    async def delete_project(self, project_id: int) -> None:
        await self.project_service.delete_project(project_id)

    async def get_all_projects(self):
        return await self.project_service.get_all_projects()

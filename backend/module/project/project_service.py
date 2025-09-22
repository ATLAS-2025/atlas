from .project_model import Project
from .project_schema_request import ProjectCreateRequest, ProjectUpdateRequest
from .project_repository import ProjectRepository
from core.database.transactional import Transactional
from loguru import logger



class ProjectService:
    def __init__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository

    @Transactional()
    async def create_project(self, project_data: ProjectCreateRequest) -> Project:
        project_dict = project_data.dict()
        logger.info("project_dict")
        logger.info(project_dict)
        data = await self.project_repository.create(project_dict)
        logger.info(data)

        return data
    async def get_project_by_id(self, project_id: int) -> Project | None:
        return await self.project_repository.get_by_id(project_id)

    async def get_all_projects(self) -> list[Project]:
        return await self.project_repository.get_all()

    @Transactional()
    async def update_project(self, project_id: int, project_data: ProjectUpdateRequest) -> Project | None:
        project_dict = project_data.dict(exclude_unset=True)
        return await self.project_repository.update(project_id, project_dict)

    @Transactional()
    async def delete_project(self, project_id: int) -> None:
        await self.project_repository.delete(project_id)

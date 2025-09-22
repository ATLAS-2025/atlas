from sqlalchemy import select
from sqlalchemy.orm import selectinload
from .project_model import Project
from core.repository import BaseRepository
from loguru import logger
class ProjectRepository(BaseRepository[Project]):
    """Project repository provides all database operations for Project."""

    async def get_by_id(self, id: int, join_: set[str] | None = None) -> Project | None:
        # Always eager-load 'tests'
        query = select(Project).options(selectinload(Project.tests)).filter(Project.id == id)
        result = await self.session.execute(query)
        return result.scalars().one_or_none()

    async def get_all(self) -> list[Project]:
        query = select(Project).options(selectinload(Project.tests))
        result = await self.session.execute(query)
        return result.scalars().all()



    async def update(self, project_id: int, project_data: dict) -> Project | None:
        # Update fields
        instance = await self.session.get(Project, project_id)
        if not instance:
            return None
        for key, value in project_data.items():
            setattr(instance, key, value)
        self.session.add(instance)
        await self.session.flush()

        # Reload with 'tests'
        query = select(Project).options(selectinload(Project.tests)).filter(Project.id == project_id)
        result = await self.session.execute(query)
        return result.scalars().first()

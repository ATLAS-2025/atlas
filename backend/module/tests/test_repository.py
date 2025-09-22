from typing import List
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from core.repository import BaseRepository
from .test_model import Test, Category, CategoryPerson, CategoryEquipment


class TestRepository(BaseRepository[Test]):

    async def get_by_id(self, id: int, join_: bool = True) -> Test | None:
        query = select(Test)
        if join_:
            query = query.options(
                selectinload(Test.categories)
                .selectinload(Category.people),
                selectinload(Test.categories)
                .selectinload(Category.equipment)
            )
        query = query.where(Test.id == id)
        return await self._one_or_none(query)

    async def get_all(self) -> List[Test]:
        query = select(Test).options(
            selectinload(Test.categories)
            .selectinload(Category.people),
            selectinload(Test.categories)
            .selectinload(Category.equipment)
        )
        return await self._all(query)
    async def create(self, obj_data: dict) -> Test:
        obj = Test(**obj_data)
        self.session.add(obj)
        await self.session.flush()  # assign PK
        return obj
    async def update(self, test_id: int, project_data: dict) -> Test | None:
        # Update fields
        instance = await self.session.get(Test, test_id)
        if not instance:
            return None
        for key, value in project_data.items():
            setattr(instance, key, value)
        self.session.add(instance)
        await self.session.flush()

        # Reload with 'tests'
        query = select(Test).options(selectinload(Test.categories)).filter(Test.id == test_id)
        result = await self.session.execute(query)
        return result.scalars().first()
    
    

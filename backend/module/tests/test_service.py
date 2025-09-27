from typing import List
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from loguru import logger
from core.database.transactional import Transactional
from .test_model import Test, Category, CategoryPerson, CategoryEquipment
from .test_repository import TestRepository
from .test_schema_request import (
    TestCreateRequest,
    TestUpdateRequest,
    CategoryCreateRequest,
    CategoryUpdateRequest,
)

class TestService:
    def __init__(self, test_repository: TestRepository):
        self.test_repository = test_repository
        self.session = test_repository.session

    # -----------------------------
    # Test CRUD
    # -----------------------------
    @Transactional()
    async def create_test(self, test_data: TestCreateRequest) -> Test:
        test_dict = test_data.dict(exclude={"categories"})
        test_obj = await self.test_repository.create(test_dict)
        await self.session.flush()  # assign PK

        for cat_data in test_data.categories or []:
            await self.add_category(test_obj.id, cat_data)

        return await self.test_repository.get_by_id(test_obj.id, join_=True)

    async def get_test_by_id(self, test_id: int) -> Test | None:
        query = (
            select(Test)
            .where(Test.id == test_id)
            .options(
                selectinload(Test.categories)
                    .selectinload(Category.people)
                    .selectinload(CategoryPerson.person),
                selectinload(Test.categories)
                    .selectinload(Category.equipment)
                    .selectinload(CategoryEquipment.equipment),
            )
        )
        return await self.test_repository._first(query)

    async def get_all_tests(self) -> List[Test]:
        return await self.test_repository.get_all()

    @Transactional()
    async def update_test(self, test_id: int, test_data: TestUpdateRequest) -> Test | None:
        test_dict = test_data.dict(exclude_unset=True, exclude={"categories"})
        test_obj = await self.test_repository.update(test_id, test_dict)

        # Update or add categories
        for cat_data in test_data.categories or []:
            if hasattr(cat_data, "id") and cat_data.id:
                await self.update_category(cat_data.id, cat_data)
            else:
                await self.add_category(test_id, cat_data)

        return await self.get_test_by_id(test_id)

    @Transactional()
    async def delete_test(self, test_id: int) -> None:
        test_obj = await self.test_repository.get_by_id(test_id, join_=True)
        if test_obj:
            await self.session.delete(test_obj)

    # -----------------------------
    # Category CRUD
    # -----------------------------
    @Transactional()
    async def add_category(self, test_id: int, category_data: CategoryCreateRequest) -> Category:
        test = await self.session.get(Test, test_id)
        if not test:
            raise ValueError(f"Test with id {test_id} not found")

        # Create category
        category = Category(name=category_data.name, test_id=test_id)
        self.session.add(category)
        await self.session.flush()  # assign PK
        logger.info(category.id)
        # Add people
        for person in category_data.people:
            self.session.add(CategoryPerson(category_id=category.id, people_id=person.people_id))

        # Add equipment
        for equip in category_data.equipment:
            self.session.add(CategoryEquipment(category_id=category.id, equipment_id=equip.equipment_id))

        await self.session.flush()
        await self.session.commit()

        # Fetch the category with its relationships directly from the session
        query = select(Category).where(Category.id == category.id).options(
        selectinload(Category.people).selectinload(CategoryPerson.person),
        selectinload(Category.equipment).selectinload(CategoryEquipment.equipment),
        )
        return await self.test_repository._first(query)

    @Transactional()
    async def update_category(self, category_id: int, category_data: CategoryUpdateRequest) -> Category:
        category = await self.session.get(Category, category_id)
        if not category:
            raise ValueError(f"Category with id {category_id} not found")

        if category_data.name:
            category.name = category_data.name

        # Update people
        if category_data.people is not None:
            # Remove old
            await self.session.execute(delete(CategoryPerson).where(CategoryPerson.category_id == category_id))
            # Add new
            for person in category_data.people:
                self.session.add(CategoryPerson(category_id=category_id, people_id=person.people_id))

        # Update equipment
        if category_data.equipment is not None:
            # Remove old
            await self.session.execute(delete(CategoryEquipment).where(CategoryEquipment.category_id == category_id))
            # Add new
            for equip in category_data.equipment:
                self.session.add(CategoryEquipment(category_id=category_id, equipment_id=equip.equipment_id))

        await self.session.flush()
        await self.session.commit()

        query = select(Category).where(Category.id == category_id).options(
        selectinload(Category.people).selectinload(CategoryPerson.person),
        selectinload(Category.equipment).selectinload(CategoryEquipment.equipment),
        )
        return await self.test_repository._first(query)

    @Transactional()
    async def delete_category(self, category_id: int) -> None:
        category = await self.session.get(Category, category_id)
        if category:
            await self.session.delete(category)

    async def get_all_categories(self) -> List[Category]:
        query = select(Category).options(
        selectinload(Category.people).selectinload(CategoryPerson.person),
        selectinload(Category.equipment).selectinload(CategoryEquipment.equipment),
        )
        return await self.test_repository._all(query)

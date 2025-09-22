from typing import List
from core.controller import BaseController
from .test_model import Test, Category
from .test_service import TestService
from .test_repository import TestRepository
from .test_schema_request import TestCreateRequest, TestUpdateRequest, CategoryCreateRequest, CategoryUpdateRequest
from .test_schema_response import TestResponse, CategoryResponse


class TestController(BaseController[Test]):
    def __init__(self, test_repository: TestRepository, test_service: TestService):
        super().__init__(model=Test, repository=test_repository)
        self.test_repository = test_repository
        self.test_service = test_service

    # -----------------------------
    # Test endpoints
    # -----------------------------
    async def create_test(self, test_data: TestCreateRequest) -> Test:
        return await self.test_service.create_test(test_data)

    async def get_test_by_id(self, test_id: int) -> Test:
        return await self.test_service.get_test_by_id(test_id)

    async def get_all_tests(self) -> List[Test]:
        return await self.test_service.get_all_tests()

    async def update_test(self, test_id: int, test_data: TestUpdateRequest) -> Test:
        return await self.test_service.update_test(test_id, test_data)

    async def delete_test(self, test_id: int) -> None:
        await self.test_service.delete_test(test_id)
    
    
    async def get_all_categories(self) -> List[Test]:
        return await self.test_service.get_all_categories()

    # -----------------------------
    # Category endpoints
    # -----------------------------
    async def add_category(self, test_id: int, category_data: CategoryCreateRequest) -> Category:
        return await self.test_service.add_category(test_id, category_data)

    async def update_category(self, category_id: int, category_data: CategoryUpdateRequest) -> Category:
        return await self.test_service.update_category(category_id, category_data)

    async def delete_category(self, category_id: int) -> None:
        await self.test_service.delete_category(category_id)

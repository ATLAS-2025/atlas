from typing import List
from fastapi import APIRouter, Depends

from module.tests import (
    Test,
    TestCreateRequest,
    TestUpdateRequest,
    TestResponse,
    CategoryCreateRequest,
    CategoryUpdateRequest,
    CategoryResponse,
    TestController,
)
from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from loguru import logger
test_router = APIRouter()

# -------------------------
# Test CRUD
# -------------------------
@test_router.get("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def get_test(id: int, test_controller: TestController = Depends(Factory().get_test_controller)) -> TestResponse:
    test = await test_controller.get_test_by_id(id)
    return TestResponse.from_orm(test)

@test_router.post("/", dependencies=[Depends(AuthenticationRequired)])
async def create_test(test_create_request: TestCreateRequest, test_controller: TestController = Depends(Factory().get_test_controller)) -> TestResponse:
    test = await test_controller.create_test(test_create_request)
    logger.info(test)
    logger.info(TestResponse.from_orm(test))
    return TestResponse.from_orm(test)

@test_router.put("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def update_test(id: int, test_update_request: TestUpdateRequest, test_controller: TestController = Depends(Factory().get_test_controller)) -> TestResponse:
    test = await test_controller.update_test(id, test_update_request)
    return TestResponse.from_orm(test)

@test_router.delete("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_test(id: int, test_controller: TestController = Depends(Factory().get_test_controller)):
    await test_controller.delete_test(id)
    return {"message": "Test deleted successfully"}

@test_router.get("/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_tests(test_controller: TestController = Depends(Factory().get_test_controller)) -> List[TestResponse]:
    tests = await test_controller.get_all_tests()
    return [TestResponse.from_orm(test) for test in tests]

# -------------------------
# Category CRUD
# -------------------------
@test_router.post("/{test_id}/categories/", dependencies=[Depends(AuthenticationRequired)])
async def add_category(test_id: int, category_create_request: CategoryCreateRequest, test_controller: TestController = Depends(Factory().get_test_controller)) -> CategoryResponse:
    
    logger.info(category_create_request)
    logger.info("Creating cat")
    
    category = await test_controller.add_category(test_id, category_create_request)
    logger.info(category)
    return CategoryResponse.from_orm(category)

@test_router.put("/categories/{category_id}", dependencies=[Depends(AuthenticationRequired)])
async def update_category(category_id: int, category_update_request: CategoryUpdateRequest, test_controller: TestController = Depends(Factory().get_test_controller)) -> CategoryResponse:
    category = await test_controller.update_category(category_id, category_update_request)
    return CategoryResponse.from_orm(category)

@test_router.delete("/categories/{category_id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_category(category_id: int, test_controller: TestController = Depends(Factory().get_test_controller)):
    await test_controller.delete_category(category_id)
    return {"message": "Category deleted successfully"}

@test_router.get("/categories/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_categories(test_controller: TestController = Depends(Factory().get_test_controller)) -> List[CategoryResponse]:
    logger.info("Req in the cat")
    cats = await test_controller.get_all_categories()
    return [CategoryResponse.from_orm(cat) for cat in cats]
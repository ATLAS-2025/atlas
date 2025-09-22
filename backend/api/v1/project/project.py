from typing import List
from fastapi import APIRouter, Depends

from module.project import (
    Project,
    ProjectCreateRequest,
    ProjectUpdateRequest,
    ProjectResponse,
    ProjectController,ProjectCreateResponse
)
from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from loguru import logger
project_router = APIRouter()


@project_router.get("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def get_project(
    id: int,
    project_controller: ProjectController = Depends(Factory().get_project_controller),
) -> ProjectResponse:
    project =  await project_controller.get_project_by_id(id)
    logger.info(project)
    logger.info(ProjectResponse.from_orm(project))
    return ProjectResponse.from_orm(project)


@project_router.post("/", dependencies=[Depends(AuthenticationRequired)])
async def create_project(
    project_create_request: ProjectCreateRequest,
    project_controller: ProjectController = Depends(Factory().get_project_controller),
) -> ProjectCreateResponse:
    project =  await project_controller.create_project(project_create_request)
    logger.info(project)
    logger.info(ProjectCreateResponse.from_orm(project))
    return ProjectCreateResponse.from_orm(project)

@project_router.put("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def update_project(
    id: int,
    project_update_request: ProjectUpdateRequest,
    project_controller: ProjectController = Depends(Factory().get_project_controller),
) -> ProjectResponse:
    return await project_controller.update_project(id, project_update_request)


@project_router.delete("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_project(
    id: int,
    project_controller: ProjectController = Depends(Factory().get_project_controller),
):
    await project_controller.delete_project(id)
    return {"message": "Project deleted successfully"}


@project_router.get("/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_projects(
    project_controller: ProjectController = Depends(Factory().get_project_controller),
) -> List[ProjectResponse]:
    
    data= await project_controller.get_all_projects()
    res = [ProjectResponse.from_orm(p) for p in data]
    logger.info(res)

    return res


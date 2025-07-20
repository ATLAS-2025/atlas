from typing import Callable

from fastapi import APIRouter, Depends, Request

from service.auth import AuthController, Token
from module.people import (
    People,
    PeopleUpdateRequest,
    PeopleCreateRequest,
    PeopleResponse,
    PeopleController,
    PeopleService,
)
from core.factory import Factory
from core.fastapi.dependencies import AuthenticationRequired
from core.fastapi.dependencies.current_user import get_current_user
from core.fastapi.dependencies.permissions import Permissions

people_router = APIRouter()


@people_router.get("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def get_peoples(
    id: int,
    people_controller: PeopleController = Depends(Factory().get_people_controller),
) -> PeopleResponse:
    people = await people_controller.get_by_id(id)

    return people


@people_router.post("/", dependencies=[Depends(AuthenticationRequired)])
async def create_person(
    people_create_request: PeopleCreateRequest,
    people_controller: PeopleController = Depends(Factory().get_people_controller),
) -> PeopleResponse:
    person = await people_controller.create_person(people_create_request)
    return person


@people_router.put("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def update_person(
    id: int,
    people_update_request: PeopleUpdateRequest,
    people_controller: PeopleController = Depends(Factory().get_people_controller),
) -> PeopleResponse:
    person = await people_controller.update_person(id, people_update_request)
    return person


@people_router.delete("/{id}", dependencies=[Depends(AuthenticationRequired)])
async def delete_person(
    id: int,
    people_controller: PeopleController = Depends(Factory().get_people_controller),
):
    await people_controller.delete_person(id)
    return {"message": "Person deleted successfully"}


@people_router.get("/", dependencies=[Depends(AuthenticationRequired)])
async def get_all_people(
    people_controller: PeopleController = Depends(Factory().get_people_controller),
) -> list[PeopleResponse]:
    all_people = await people_controller.get_all_people()
    return all_people

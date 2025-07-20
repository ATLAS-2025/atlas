from .people_model import People
from .people_service import PeopleService
from .people_schema_request import PeopleCreateRequest, PeopleUpdateRequest
from .people_schema_response import PeopleResponse

from .people_repository import PeopleRepository

from core.controller import BaseController


class PeopleController(BaseController[People]):
    def __init__(self, people_repository: PeopleRepository, people_service: PeopleService):
        super().__init__(model=People, repository=people_repository)
        self.people_repository = people_repository
        self.people_service = people_service

    async def get_by_id(self, id: int) -> People:
        return await self.people_service.get_person_by_id(id)

    async def get_by_email(self, email: str) -> People:
        return await self.people_service.get_person_by_email(email)

    async def create_person(self, person_data: PeopleCreateRequest) -> People:
        return await self.people_service.create_person(person_data)

    async def update_person(self, id: int, person_data: PeopleUpdateRequest) -> People:
        return await self.people_service.update_person(id, person_data)

    async def delete_person(self, id: int) -> None:
        await self.people_service.delete_person(id)

    async def get_all_people(self) -> list[People]:
        return await self.people_service.get_all_people()

from .people_model import People
from .people_schema_request import PeopleCreateRequest, PeopleUpdateRequest

from .people_repository import PeopleRepository

from core.database.transactional import Transactional

class PeopleService:

    def __init__(self, people_repository: PeopleRepository):
        self.people_repository = people_repository

    @Transactional()
    async def create_person(self, person_data: PeopleCreateRequest) -> People:
        return await self.people_repository.create(person_data.dict())

    async def get_person_by_id(self, person_id: int) -> People | None:
        return await self.people_repository.get_by_id(person_id)

    async def get_person_by_email(self, email: str) -> People | None:
        return await self.people_repository.get_by_email(email)

    @Transactional()
    async def update_person(self, person_id: int, person_data: PeopleUpdateRequest) -> People | None:
        return await self.people_repository.update(person_id, person_data.dict(exclude_unset=True))

    @Transactional()
    async def delete_person(self, person_id: int) -> None:
        await self.people_repository.delete(person_id)

    async def get_all_people(self) -> list[People]:
        return await self.people_repository.get_all()

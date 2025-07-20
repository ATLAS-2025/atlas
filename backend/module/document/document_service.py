from . import Document
from .document_repository import DocumentRepository
from .document_schema_request import DocumentCreateRequest, DocumentUpdateRequest
from core.database.transactional import Transactional

class DocumentService:
    def __init__(self, document_repository: DocumentRepository):
        self.document_repository = document_repository

    @Transactional()
    async def create_document(self, document_data: DocumentCreateRequest) -> Document:
        return await self.document_repository.create(document_data.model_dump())

    async def get_document_by_id(self, document_id: int) -> Document | None:
        return await self.document_repository.get_by_id(document_id)

    @Transactional()
    async def update_document(self, document_id: int, document_data: DocumentUpdateRequest) -> Document | None:
        return await self.document_repository.update(document_id, document_data.model_dump(exclude_unset=True))

    @Transactional()
    async def delete_document(self, document_id: int) -> None:
        await self.document_repository.delete(document_id)

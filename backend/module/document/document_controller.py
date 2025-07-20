from document import Document, DocumentService, DocumentCreateRequest, DocumentUpdateRequest,DocumentResponse
from core.controller import BaseController
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

router = APIRouter()

class DocumentController(BaseController[Document]):
    def __init__(self, document_service: DocumentService):
        super().__init__(model=Document, service=document_service)
        self.document_service = document_service

    @router.post("/", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
    async def create_document(self, document_data: DocumentCreateRequest):
        return await self.document_service.create_document(document_data)

    @router.get("/{document_id}", response_model=DocumentResponse)
    async def get_document(self, document_id: int):
        document = await self.document_service.get_document_by_id(document_id)
        if not document:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
        return document

    @router.put("/{document_id}", response_model=DocumentResponse)
    async def update_document(self, document_id: int, document_data: DocumentUpdateRequest):
        document = await self.document_service.update_document(document_id, document_data)
        if not document:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
        return document

    @router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete_document(self, document_id: int):
        await self.document_service.delete_document(document_id)
        return {"message": "Document deleted successfully"}

    @router.get("/", response_model=List[DocumentResponse])
    async def get_all_documents(self):
        return await self.document_service.document_repository.get_all()
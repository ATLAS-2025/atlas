from sqlalchemy import Column, Integer, String, Text, DateTime

from datetime import datetime

from core.database import Base,TimestampMixin

class Document(TimestampMixin,Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    file_path = Column(String)
    type = Column(String)
    description = Column(Text)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

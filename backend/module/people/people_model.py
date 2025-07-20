from sqlalchemy import Column, Integer, String, Text

from core.database import Base

class People(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    organization = Column(String)
    calendar_integration_id = Column(String, nullable=True)

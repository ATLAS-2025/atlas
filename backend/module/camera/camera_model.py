from sqlalchemy import Column, Integer, String, Text

from core.database import Base

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    model = Column(String)
    resolution = Column(String)
    serial_number = Column(String, unique=True, index=True)
    notes = Column(Text)

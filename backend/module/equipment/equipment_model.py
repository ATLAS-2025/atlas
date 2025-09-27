from sqlalchemy import Column, Integer, String, Text

from core.database import Base,TimestampMixin

class Equipment(TimestampMixin,Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    manufacturer = Column(String)
    model = Column(String)
    serial_number = Column(String, unique=True, index=True)
    location = Column(String)
    notes = Column(Text)

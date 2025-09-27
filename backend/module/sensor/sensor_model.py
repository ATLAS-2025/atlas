from sqlalchemy import Column, Integer, String, DateTime, Text

from datetime import datetime

from core.database import Base, TimestampMixin

class Sensor(TimestampMixin,Base):
    __tablename__ = "sensors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    model = Column(String)
    serial_number = Column(String, unique=True, index=True)
    calibration_date = Column(DateTime)
    notes = Column(Text)

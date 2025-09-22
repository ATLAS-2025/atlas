from time import time
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from core.database import Base,TimestampMixin


class Project(TimestampMixin,Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime, default=datetime.now())
    title = Column(String(255), nullable=False)
    subtitle = Column(String(255))
    project_type = Column(String(255))
    # Relationship to Test
    tests = relationship("Test", back_populates="project")


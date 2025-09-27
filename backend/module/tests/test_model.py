from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base,TimestampMixin


class Test(TimestampMixin,Base):
    __tablename__ = "project_tests"

    id = Column(Integer, primary_key=True, autoincrement=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    name = Column(Text)
    schedule = Column(Text)
    safety = Column(Text)
    maps = Column(Text)
    simulation = Column(Text)
    summary = Column(Text)
    tags = Column(Text)

    # Relationships
    project = relationship("Project", back_populates="tests")
    categories = relationship(
        "Category", back_populates="test", cascade="all, delete-orphan"
    )


class Category(TimestampMixin,Base):
    __tablename__ = "test_categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    test_id = Column(Integer, ForeignKey("project_tests.id"), nullable=False)

    # Relationships
    test = relationship("Test", back_populates="categories")
    people = relationship(
        "CategoryPerson", back_populates="category", cascade="all, delete-orphan"
    )
    equipment = relationship(
        "CategoryEquipment", back_populates="category", cascade="all, delete-orphan"
    )


class CategoryPerson(TimestampMixin,Base):
    __tablename__ = "test_category_people"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("test_categories.id"), nullable=False)
    people_id = Column(Integer, ForeignKey("people.id"), nullable=False)

    category = relationship("Category", back_populates="people")
    person = relationship("People")


class CategoryEquipment(TimestampMixin,Base):
    __tablename__ = "test_category_equipment"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_id = Column(Integer, ForeignKey("test_categories.id"), nullable=False)
    equipment_id = Column(Integer, ForeignKey("equipment.id"), nullable=False)

    category = relationship("Category", back_populates="equipment")
    equipment = relationship("Equipment")

from sqlalchemy import Column, Integer, String, Enum
from app.models.base import Base
import enum

class UserRole(str, enum.Enum):
    STUDENT = "student"
    TEACHER = "teacher"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)
    grade_level = Column(String, nullable=True)

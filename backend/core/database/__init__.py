from .session import (
    Base,
    get_session,
    reset_session_context,
    session,
    set_session_context,
)
from .standalone_session import standalone_session
from .transactional import Propagation, Transactional

from datetime import datetime
from sqlalchemy import Column, DateTime

__all__ = [
    "Base",
    "session",
    "get_session",
    "set_session_context",
    "reset_session_context",
    "standalone_session",
    "Transactional",
    "Propagation",
]


class TimestampMixin:
    created_at = Column(DateTime, default=datetime.now(), nullable=False)
    updated_at = Column(
        DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False
    )

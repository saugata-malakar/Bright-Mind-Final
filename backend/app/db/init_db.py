from app.db.session import engine
from app.models.base import Base

# Import models to ensure they are registered with Base
import app.models.user
import app.models.session
import app.models.assessment

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

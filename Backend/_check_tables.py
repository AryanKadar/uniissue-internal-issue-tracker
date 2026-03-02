"""Quick check: list tables in the unico database."""
import asyncio
from database import engine
from sqlalchemy import text

async def check():
    async with engine.connect() as conn:
        result = await conn.execute(
            text("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
        )
        tables = [row[0] for row in result.fetchall()]
        print(f"Tables found: {tables}")
        
        for t in tables:
            if t == "alembic_version":
                continue
            result = await conn.execute(text(f"SELECT count(*) FROM {t}"))
            count = result.scalar()
            print(f"  {t}: {count} rows")

asyncio.run(check())

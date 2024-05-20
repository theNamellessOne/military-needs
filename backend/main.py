from fastapi import FastAPI

from need.api_router import router as need_api_router
from auth.api_router import router as auth_api_router


from database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(need_api_router, prefix="/api/needs", tags=["need-api"])
app.include_router(auth_api_router, prefix="/api/auth", tags=["auth-api"])

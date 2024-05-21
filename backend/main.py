from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from need.api_router import router as need_api_router
from user.api_router import router as user_api_router
from auth.api_router import router as auth_api_router


from database import Base, engine

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins from the list
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

Base.metadata.create_all(bind=engine)

app.include_router(need_api_router, prefix="/api/needs", tags=["needs-api"])
app.include_router(user_api_router, prefix="/api/users", tags=["users-api"])
app.include_router(auth_api_router, prefix="/api/auth", tags=["auth-api"])

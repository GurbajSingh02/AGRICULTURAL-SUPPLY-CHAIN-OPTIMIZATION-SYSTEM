from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app import models
from app.routes.farmers import router as farmers_router
from app.routes.crops import router as crops_router
from app.routes.warehouses import router as warehouses_router
from app.routes.inventory import router as inventory_router
from app.routes.optimization import router as optimization_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Agricultural Supply Chain Optimization System",
    description="An AI-based platform for managing and optimizing agricultural supply chains.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(farmers_router)
app.include_router(crops_router)
app.include_router(warehouses_router)
app.include_router(inventory_router)
app.include_router(optimization_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to the Agricultural Supply Chain Optimization System!",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "Agricultural Supply Chain Optimization System"
    }
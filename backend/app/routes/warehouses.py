from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Warehouse

router = APIRouter(
    prefix="/warehouses",
    tags=["Warehouses"]
)


@router.post("/")
def create_warehouse(
    name: str,
    location: str,
    capacity_kg: float,
    current_stock_kg: float = 0,
    db: Session = Depends(get_db)
):
    if capacity_kg <= 0:
        raise HTTPException(
            status_code=400,
            detail="Warehouse capacity must be greater than zero"
        )

    if current_stock_kg < 0 or current_stock_kg > capacity_kg:
        raise HTTPException(
            status_code=400,
            detail="Current stock must be between zero and warehouse capacity"
        )

    warehouse = Warehouse(
        name=name,
        location=location,
        capacity_kg=capacity_kg,
        current_stock_kg=current_stock_kg
    )

    db.add(warehouse)
    db.commit()
    db.refresh(warehouse)

    return {
        "message": "Warehouse added successfully",
        "warehouse": {
            "id": warehouse.id,
            "name": warehouse.name,
            "location": warehouse.location,
            "capacity_kg": warehouse.capacity_kg,
            "current_stock_kg": warehouse.current_stock_kg
        }
    }


@router.get("/")
def get_warehouses(db: Session = Depends(get_db)):
    warehouses = db.query(Warehouse).all()

    return [
        {
            "id": warehouse.id,
            "name": warehouse.name,
            "location": warehouse.location,
            "capacity_kg": warehouse.capacity_kg,
            "current_stock_kg": warehouse.current_stock_kg,
            "available_capacity_kg": (
                warehouse.capacity_kg - warehouse.current_stock_kg
            )
        }
        for warehouse in warehouses
    ]


@router.get("/{warehouse_id}")
def get_warehouse(
    warehouse_id: int,
    db: Session = Depends(get_db)
):
    warehouse = (
        db.query(Warehouse)
        .filter(Warehouse.id == warehouse_id)
        .first()
    )

    if warehouse is None:
        raise HTTPException(
            status_code=404,
            detail="Warehouse not found"
        )

    return {
        "id": warehouse.id,
        "name": warehouse.name,
        "location": warehouse.location,
        "capacity_kg": warehouse.capacity_kg,
        "current_stock_kg": warehouse.current_stock_kg,
        "available_capacity_kg": (
            warehouse.capacity_kg - warehouse.current_stock_kg
        )
    }
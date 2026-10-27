from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Crop, Warehouse

router = APIRouter(
    prefix="/inventory",
    tags=["Inventory"]
)


@router.get("/")
def get_inventory(db: Session = Depends(get_db)):
    crops = db.query(Crop).all()
    warehouses = db.query(Warehouse).all()

    return {
        "crops": [
            {
                "id": crop.id,
                "name": crop.name,
                "quantity_kg": crop.quantity_kg,
                "price_per_kg": crop.price_per_kg,
                "farmer_id": crop.farmer_id,
                "estimated_value": crop.quantity_kg * crop.price_per_kg
            }
            for crop in crops
        ],
        "warehouses": [
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
        ],
        "summary": {
            "total_crop_types": len(crops),
            "total_crop_quantity_kg": sum(
                crop.quantity_kg for crop in crops
            ),
            "total_warehouses": len(warehouses),
            "total_storage_capacity_kg": sum(
                warehouse.capacity_kg for warehouse in warehouses
            ),
            "total_stock_kg": sum(
                warehouse.current_stock_kg for warehouse in warehouses
            )
        }
    }


@router.get("/crops/{crop_id}")
def get_crop_inventory(crop_id: int, db: Session = Depends(get_db)):
    crop = db.query(Crop).filter(Crop.id == crop_id).first()

    if crop is None:
        raise HTTPException(status_code=404, detail="Crop not found")

    return {
        "crop_id": crop.id,
        "name": crop.name,
        "quantity_kg": crop.quantity_kg,
        "price_per_kg": crop.price_per_kg,
        "farmer_id": crop.farmer_id,
        "estimated_value": crop.quantity_kg * crop.price_per_kg
    }


@router.get("/warehouses/{warehouse_id}")
def get_warehouse_inventory(
    warehouse_id: int,
    db: Session = Depends(get_db)
):
    warehouse = (
        db.query(Warehouse)
        .filter(Warehouse.id == warehouse_id)
        .first()
    )

    if warehouse is None:
        raise HTTPException(status_code=404, detail="Warehouse not found")

    return {
        "warehouse_id": warehouse.id,
        "name": warehouse.name,
        "location": warehouse.location,
        "capacity_kg": warehouse.capacity_kg,
        "current_stock_kg": warehouse.current_stock_kg,
        "available_capacity_kg": (
            warehouse.capacity_kg - warehouse.current_stock_kg
        )
    }
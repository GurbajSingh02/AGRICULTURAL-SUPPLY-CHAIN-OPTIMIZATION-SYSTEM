from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Crop, Farmer

router = APIRouter(
    prefix="/crops",
    tags=["Crops"]
)


@router.post("/")
def create_crop(
    name: str,
    quantity_kg: float,
    price_per_kg: float,
    farmer_id: int,
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()

    if farmer is None:
        raise HTTPException(
            status_code=404,
            detail="Farmer not found. Please register the farmer first."
        )

    crop = Crop(
        name=name,
        quantity_kg=quantity_kg,
        price_per_kg=price_per_kg,
        farmer_id=farmer_id
    )

    db.add(crop)
    db.commit()
    db.refresh(crop)

    return {
        "message": "Crop added successfully",
        "crop": {
            "id": crop.id,
            "name": crop.name,
            "quantity_kg": crop.quantity_kg,
            "price_per_kg": crop.price_per_kg,
            "farmer_id": crop.farmer_id
        }
    }


@router.get("/")
def get_crops(db: Session = Depends(get_db)):
    crops = db.query(Crop).all()

    return [
        {
            "id": crop.id,
            "name": crop.name,
            "quantity_kg": crop.quantity_kg,
            "price_per_kg": crop.price_per_kg,
            "farmer_id": crop.farmer_id
        }
        for crop in crops
    ]
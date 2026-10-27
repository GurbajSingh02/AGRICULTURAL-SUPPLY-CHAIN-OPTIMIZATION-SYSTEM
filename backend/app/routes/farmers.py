from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Farmer

router = APIRouter(
    prefix="/farmers",
    tags=["Farmers"]
)


@router.post("/")
def create_farmer(
    name: str,
    location: str,
    phone: str = None,
    db: Session = Depends(get_db)
):
    farmer = Farmer(
        name=name,
        location=location,
        phone=phone
    )

    db.add(farmer)
    db.commit()
    db.refresh(farmer)

    return {
        "message": "Farmer added successfully",
        "farmer": {
            "id": farmer.id,
            "name": farmer.name,
            "location": farmer.location,
            "phone": farmer.phone
        }
    }


@router.get("/")
def get_farmers(db: Session = Depends(get_db)):
    farmers = db.query(Farmer).all()

    return [
        {
            "id": farmer.id,
            "name": farmer.name,
            "location": farmer.location,
            "phone": farmer.phone
        }
        for farmer in farmers
    ]


@router.get("/{farmer_id}")
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()

    if farmer is None:
        raise HTTPException(status_code=404, detail="Farmer not found")

    return {
        "id": farmer.id,
        "name": farmer.name,
        "location": farmer.location,
        "phone": farmer.phone
    }
@router.post("/bulk")
def create_farmers_bulk(
    farmers: list[dict],
    db: Session = Depends(get_db)
):
    created_count = 0
    skipped_count = 0

    for item in farmers:
        name = str(item.get("name", "")).strip()
        location = str(item.get("location", "")).strip()
        phone = str(item.get("phone", "")).strip()

        if not name or not location:
            skipped_count += 1
            continue

        # Skip a farmer if the same name and location already exist
        existing = db.query(Farmer).filter(
            Farmer.name == name,
            Farmer.location == location
        ).first()

        if existing:
            skipped_count += 1
            continue

        farmer = Farmer(
            name=name,
            location=location,
            phone=phone or None
        )
        db.add(farmer)
        created_count += 1

    db.commit()

    return {
        "message": "Bulk farmer import completed",
        "created_count": created_count,
        "skipped_count": skipped_count
    }
@router.put("/{farmer_id}")
def update_farmer(
    farmer_id: int,
    name: str,
    location: str,
    phone: str = "",
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()

    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    farmer.name = name
    farmer.location = location
    farmer.phone = phone or None

    db.commit()
    db.refresh(farmer)

    return {
        "message": "Farmer updated successfully",
        "farmer": {
            "id": farmer.id,
            "name": farmer.name,
            "location": farmer.location,
            "phone": farmer.phone
        }
    }


@router.delete("/{farmer_id}")
def delete_farmer(
    farmer_id: int,
    db: Session = Depends(get_db)
):
    farmer = db.query(Farmer).filter(Farmer.id == farmer_id).first()

    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    db.delete(farmer)
    db.commit()

    return {"message": "Farmer deleted successfully"}

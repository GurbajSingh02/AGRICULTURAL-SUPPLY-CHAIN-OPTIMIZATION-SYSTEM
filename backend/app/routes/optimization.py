from urllib import request

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from optimization.engine import (
    calculate_transport_cost,
    calculate_storage_availability,
    calculate_crop_value,
)

router = APIRouter(
    prefix="/optimization",
    tags=["Supply Chain Optimization"]
)


class TransportRequest(BaseModel):
    distance_km: float = Field(ge=0)
    cost_per_km: float = Field(ge=0)
    quantity_kg: float = Field(gt=0)


class StorageRequest(BaseModel):
    capacity_kg: float = Field(gt=0)
    current_stock_kg: float = Field(ge=0)


class CropValueRequest(BaseModel):
    quantity_kg: float = Field(ge=0)
    price_per_kg: float = Field(ge=0)


@router.post("/transport-cost")
def estimate_transport_cost(request: TransportRequest):
    try:
        cost = calculate_transport_cost(
            request.distance_km,
            request.cost_per_km,
            request.quantity_kg
        )
        return {
            "estimated_transport_cost": cost,
            "currency": "INR",
            "distance_km": request.distance_km,
            "quantity_kg": request.quantity_kg
        }
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/storage")
def analyze_storage(request: StorageRequest):
    try:
        result = calculate_storage_availability(
            request.capacity_kg,
            request.current_stock_kg
        )
        return result
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


@router.post("/crop-value")
def estimate_crop_value(request: CropValueRequest):
    try:
        value = calculate_crop_value(
            request.quantity_kg,
            request.price_per_kg
        )
        return {
            "estimated_crop_value": value,
            "currency": "INR",
            "quantity_kg": request.quantity_kg,
            "price_per_kg": request.price_per_kg
        }
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
@router.post("/recommendations")
def get_recommendations(request: dict):
    recommendations = []

    capacity = float(request.get("capacity_kg", 0))
    stock = float(request.get("current_stock_kg", 0))
    distance = float(request.get("distance_km", 0))
    cost_per_km = float(request.get("cost_per_km", 0))
    quantity = float(request.get("quantity_kg", 0))

    if capacity <= 0:
        recommendations.append({
            "priority": "High",
            "message": "Enter a valid warehouse capacity greater than zero."
        })
    elif stock < 0 or stock > capacity:
        recommendations.append({
            "priority": "High",
            "message": "Warehouse stock is outside its valid capacity range. Review the inventory figures."
        })
    else:
        utilization = (stock / capacity) * 100
        available = capacity - stock

        if utilization >= 90:
            recommendations.append({
                "priority": "High",
                "message": f"Warehouse utilization is {utilization:.1f}%. Review incoming shipments and alternative storage options."
            })
        elif utilization >= 70:
            recommendations.append({
                "priority": "Medium",
                "message": f"Warehouse utilization is {utilization:.1f}%. Check upcoming deliveries to prevent storage pressure."
            })
        else:
            recommendations.append({
                "priority": "Low",
                "message": f"{available:,.0f} kg of warehouse capacity is available."
            })

    if distance < 0 or cost_per_km < 0 or quantity < 0:
        recommendations.append({
            "priority": "High",
            "message": "Distance, transport rate, and shipment quantity must not be negative."
        })
    elif distance > 0 and cost_per_km >= 0 and quantity > 0:
        total_cost = distance * cost_per_km
        cost_per_kg = total_cost / quantity

        recommendations.append({
            "priority": "Low",
            "message": f"Estimated transport cost is ₹{total_cost:,.2f}, or ₹{cost_per_kg:,.2f} per kg. Compare with alternative routes before deciding."
        })

    if not recommendations:
        recommendations.append({
            "priority": "Low",
            "message": "Enter warehouse and shipment details to receive recommendations."
        })

    return {"recommendations": recommendations}
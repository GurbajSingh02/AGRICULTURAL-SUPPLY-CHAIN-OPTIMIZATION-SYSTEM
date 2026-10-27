def calculate_transport_cost(distance_km, cost_per_km, quantity_kg):
    """
    Calculate the estimated transportation cost for agricultural products.
    """
    if distance_km < 0:
        raise ValueError("Distance cannot be negative.")

    if cost_per_km < 0:
        raise ValueError("Cost per kilometer cannot be negative.")

    if quantity_kg <= 0:
        raise ValueError("Quantity must be greater than zero.")

    return round(distance_km * cost_per_km, 2)


def calculate_storage_availability(capacity_kg, current_stock_kg):
    """
    Calculate the remaining storage capacity of a warehouse.
    """
    if capacity_kg <= 0:
        raise ValueError("Warehouse capacity must be greater than zero.")

    if current_stock_kg < 0:
        raise ValueError("Current stock cannot be negative.")

    if current_stock_kg > capacity_kg:
        raise ValueError("Current stock cannot exceed warehouse capacity.")

    available_capacity = capacity_kg - current_stock_kg

    return {
        "capacity_kg": capacity_kg,
        "current_stock_kg": current_stock_kg,
        "available_capacity_kg": available_capacity,
        "utilization_percentage": round(
            (current_stock_kg / capacity_kg) * 100, 2
        )
    }


def calculate_crop_value(quantity_kg, price_per_kg):
    """
    Estimate the total value of a quantity of agricultural produce.
    """
    if quantity_kg < 0 or price_per_kg < 0:
        raise ValueError("Quantity and price cannot be negative.")

    return round(quantity_kg * price_per_kg, 2)


if __name__ == "__main__":
    # Example transportation calculation
    transport_cost = calculate_transport_cost(
        distance_km=120,
        cost_per_km=15,
        quantity_kg=500
    )

    print("Estimated transport cost:", transport_cost)

    # Example warehouse calculation
    storage = calculate_storage_availability(
        capacity_kg=10000,
        current_stock_kg=2500
    )

    print("Warehouse storage:", storage)

    # Example crop valuation
    crop_value = calculate_crop_value(
        quantity_kg=500,
        price_per_kg=25
    )

    print("Estimated crop value:", crop_value)
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=True)

    crops = relationship("Crop", back_populates="farmer")


class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    quantity_kg = Column(Float, nullable=False, default=0)
    price_per_kg = Column(Float, nullable=False, default=0)

    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=False)

    farmer = relationship("Farmer", back_populates="crops")


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(200), nullable=False)
    capacity_kg = Column(Float, nullable=False)
    current_stock_kg = Column(Float, nullable=False, default=0)
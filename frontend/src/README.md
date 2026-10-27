Agricultural Supply Chain Optimization System

1. Project Overview

The Agricultural Supply Chain Optimization System is a web-based application designed to help manage agricultural resources and support supply chain planning.

The system provides tools to manage farmers, track crops, monitor warehouse inventory, calculate transportation costs, estimate crop values, and generate rule-based supply chain recommendations.

2. Objectives
	•	Centralize farmer and crop information.
	•	Monitor warehouse capacity and inventory levels.
	•	Estimate transportation costs for crop shipments.
	•	Calculate the estimated market value of crops.
	•	Identify potential warehouse capacity issues.
	•	Provide recommendations to support agricultural logistics decisions.

3. Technologies Used
Frontend
	•	React
	•	Vite
	•	JavaScript
	•	CSS
	•	Axios

Backend
	•	Python
	•	FastAPI
	•	SQLAlchemy
	•	SQLite

Optimization
	•	Python-based rule engine
	•	Warehouse utilization analysis
	•	Transportation cost calculations
	•	Crop valuation calculations

4. Main Features

Dashboard

Displays an overview of the agricultural supply chain.

Farmer Management

Retrieves and manages farmer information.

Crop Management

Displays crop quantities and prices and calculates estimated crop values.

Warehouse Management

Tracks warehouse capacity, current stock, available capacity, and utilization.

Inventory Management

Provides an overview of crop inventory and warehouse storage.

Optimization Module

Includes three calculators:
	1.	Transportation Cost: Estimates shipment cost using distance and cost per kilometer.
	2.	Warehouse Storage: Calculates available capacity and warehouse utilization.
	3.	Crop Valuation: Estimates crop value using quantity and price per kilogram.

Rule-Based Recommendations

Generates recommendations based on warehouse capacity, current stock, and shipment details. It can flag warehouses approaching capacity limits and estimate transportation costs.

5. System Architecture

The application uses a frontend-backend architecture.
	1.	The React frontend displays pages and collects user input.
	2.	Axios sends HTTP requests to the FastAPI backend.
	3.	FastAPI processes requests and executes calculation and recommendation logic.
	4.	SQLAlchemy provides database access to SQLite.
	5.	The backend returns results to the frontend as JSON.

6. Project Structure
agri-supply-chain/
├── backend/
│   └── app/
│       ├── main.py
│       ├── database.py
│       ├── models.py
│       └── routes/
│           └── optimization.py
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── api.js
├── venv/
└── README.md

This is a simplified overview of the main project files.

7. How to Run the Project

Start the Backend

Open a terminal and run:

cd ~/agri-supply-chain/backend
../venv/bin/python -m uvicorn app.main:app --reload

The backend API is available at:

http://127.0.0.1:8000

Interactive API documentation:

http://127.0.0.1:8000/docs

Start the Frontend

Open a second terminal and run:

cd ~/agri-supply-chain/frontend
npm run dev

Open the local frontend address displayed in the terminal. It is commonly:

http://localhost:5173

Keep both terminals running while using the application.

8. Example Calculations

Transportation Cost
	•	Distance: 120 km
	•	Cost per kilometer: ₹15
	•	Shipment quantity: 500 kg

Estimated transportation cost:

120 × ₹15 = ₹1,800

Estimated cost per kilogram:

₹1,800 ÷ 500 = ₹3.60/kg

Warehouse Storage
	•	Total capacity: 10,000 kg
	•	Current stock: 2,500 kg

Available capacity:

10,000 − 2,500 = 7,500 kg

Warehouse utilization:

(2,500 ÷ 10,000) × 100 = 25%

Crop Valuation
	•	Crop quantity: 500 kg
	•	Price per kilogram: ₹25

Estimated crop value:

500 × ₹25 = ₹12,500

These are illustrative examples, not live market prices.

9. Future Enhancements

Possible future improvements include:
	•	Crop demand forecasting using historical data.
	•	Route comparison and transportation optimization.
	•	Automated alerts for warehouse capacity limits.
	•	Interactive inventory charts.
	•	User authentication and role-based access.
	•	More comprehensive shipment and supply chain tracking.

10. Conclusion

The Agricultural Supply Chain Optimization System combines agricultural resource management with practical cost calculations and rule-based recommendations. It provides a foundation for improving inventory visibility and supporting logistics planning in agricultural supply chains.
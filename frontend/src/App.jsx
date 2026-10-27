import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [farmers, setFarmers] = useState([]);
const [crops, setCrops] = useState([]);
const [warehouses, setWarehouses] = useState([]);
useEffect(() => {
  async function loadDashboardData() {
    try {
      const [farmersResponse, cropsResponse, warehousesResponse] =
        await Promise.all([
          api.get("/farmers/"),
          api.get("/crops/"),
          api.get("/warehouses/"),
        ]);

      setFarmers(farmersResponse.data);
      setCrops(cropsResponse.data);
      setWarehouses(warehousesResponse.data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }

  loadDashboardData();
}, []);

  const menuItems = [
    "Dashboard",
    "Farmers",
    "Crops",
    "Warehouses",
    "Inventory",
    "Optimization",
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>🌱 AgriSupply</h2>
        <p className="sidebar-subtitle">Supply Chain Management</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${activePage === item ? "active" : ""}`}
              onClick={() => setActivePage(item)}
            >
              {item === "Dashboard" && "▦"}
              {item === "Farmers" && "♧"}
              {item === "Crops" && "❧"}
              {item === "Warehouses" && "⌂"}
              {item === "Inventory" && "▤"}
              {item === "Optimization" && "⌁"}
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          System Online
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">AGRICULTURAL MANAGEMENT</p>
            <h1>{activePage}</h1>
          </div>
          <div className="profile">
            <span className="profile-icon">🌾</span>
            <div>
              <strong>Administrator</strong>
              <small>Supply Chain Manager</small>
            </div>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          <>
            <section className="welcome-banner">
              <div>
                <p className="banner-label">SMART AGRICULTURE PLATFORM</p>
                <h2>Growing a smarter supply chain.</h2>
                <p>
                  Monitor your agricultural operations from farm to
                  warehouse in one place.
                </p>
              </div>
              <div className="banner-art">🌱</div>
            </section>

            <section className="stats-grid">
              <article className="stat-card">
                <div className="stat-icon green">♧</div>
                <p>Total Farmers</p>
                <h3>{farmers.length}</h3>
                <small>Connected to your database soon</small>
              </article>

              <article className="stat-card">
                <div className="stat-icon yellow">❧</div>
                <p>Crop Varieties</p>
                <h3>{crops.length}</h3>
                <small>Crop records will appear here</small>
              </article>

              <article className="stat-card">
                <div className="stat-icon blue">⌂</div>
                <p>Warehouses</p>
                <h3>{warehouses.length}</h3>
                <small>Storage locations will appear here</small>
              </article>

              <article className="stat-card">
                <div className="stat-icon purple">⌁</div>
                <p>Optimization</p>
                <h3>Ready</h3>
                <small>Cost and storage tools available</small>
              </article>
            </section>

            <section className="content-grid">
              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Supply Chain Overview</h2>
                    <p>Your agricultural operations at a glance</p>
                  </div>
                  <span className="live-badge">● Live system</span>
                </div>

                <div className="supply-chain">
                  <div className="chain-step">
                    <span>🚜</span>
                    <strong>Farmers</strong>
                    <small>Crop production</small>
                  </div>
                  <div className="chain-arrow">→</div>
                  <div className="chain-step">
                    <span>🏬</span>
                    <strong>Warehouses</strong>
                    <small>Storage management</small>
                  </div>
                  <div className="chain-arrow">→</div>
                  <div className="chain-step">
                    <span>🚚</span>
                    <strong>Distribution</strong>
                    <small>Delivery planning</small>
                  </div>
                </div>
              </article>

              <article className="panel quick-actions">
                <h2>Quick Navigation</h2>
                <p>Explore your management tools.</p>

                {["Farmers", "Crops", "Warehouses", "Inventory", "Optimization"].map(
                  (item) => (
                    <button
                      className="quick-link"
                      key={item}
                      onClick={() => setActivePage(item)}
                    >
                      <span>{item}</span>
                      <span>→</span>
                    </button>
                  )
                )}
              </article>
            </section>

            <footer>
              Agricultural Supply Chain Optimization System · Dashboard
            </footer>
          </>
        ) : activePage === "Farmers" ? (
  <section className="panel">
    <div className="panel-heading">
      <div>
        <h2>Registered Farmers</h2>
        <p>Farmers currently stored in your database</p>
      </div>
      <span className="live-badge">{farmers.length} Farmers</span>
    </div>

    <div style={{ overflowX: "auto", marginTop: "24px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr>
            <th style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>ID</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>Name</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>Location</th>
            <th style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>Phone</th>
            <th style={{ padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmers.length > 0 ? (
            farmers.map((farmer) => (
              <tr key={farmer.id}>
                <td style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>{farmer.id}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>{farmer.name}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>{farmer.location}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>{farmer.phone || "—"}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #e8ece5" }}>
  <button
    onClick={() => {
      const name = prompt("Farmer name:", farmer.name);
      if (name === null) return;

      const location = prompt("Farmer location:", farmer.location);
      if (location === null) return;

      const phone = prompt("Phone number:", farmer.phone || "");
      if (phone === null) return;

      fetch(
  `http://127.0.0.1:8000/farmers/${farmer.id}?name=${encodeURIComponent(name)}&location=${encodeURIComponent(location)}&phone=${encodeURIComponent(phone)}`,
  {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: undefined
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(await response.text());
          }
          window.location.reload();
        })
        .catch((error) => alert("Could not update farmer: " + error.message));
    }}
  >
    Edit
  </button>

  <button
    style={{ marginLeft: "8px" }}
    onClick={() => {
      if (!window.confirm(`Delete farmer ${farmer.name}?`)) return;

      fetch(`http://127.0.0.1:8000/farmers/${farmer.id}`, {
        method: "DELETE"
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(await response.text());
          }
          window.location.reload();
        })
        .catch((error) => alert("Could not delete farmer: " + error.message));
    }}
  >
    Delete
  </button>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: "20px", textAlign: "center" }}>
                No farmers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <button className="back-button" style={{ marginTop: "20px" }} onClick={() => setActivePage("Dashboard")}>
      ← Back to Dashboard
    </button>
  </section>
) : activePage === "Crops" ? (
  <section className="panel">
    <h2>Crop Management</h2>
    <p>View crop quantities, prices, and estimated values.</p>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crop Name</th>
            <th>Quantity (kg)</th>
            <th>Price per kg (₹)</th>
            <th>Farmer ID</th>
            <th>Estimated Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td>{crop.id}</td>
              <td>{crop.name}</td>
              <td>{crop.quantity_kg}</td>
              <td>₹{crop.price_per_kg}</td>
              <td>{crop.farmer_id}</td>
              <td>
                ₹{(crop.quantity_kg * crop.price_per_kg).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {crops.length === 0 && <p>No crops found. Add crops through the backend API.</p>}
    </div>
  </section>
) : activePage === "Crops" ? (
  <section className="panel">
    <h2>Crop Management</h2>
    <p>View crop quantities, prices, and estimated values.</p>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crop Name</th>
            <th>Quantity (kg)</th>
            <th>Price per kg (₹)</th>
            <th>Farmer ID</th>
            <th>Estimated Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td>{crop.id}</td>
              <td>{crop.name}</td>
              <td>{crop.quantity_kg}</td>
              <td>₹{crop.price_per_kg}</td>
              <td>{crop.farmer_id}</td>
              <td>
                ₹{(crop.quantity_kg * crop.price_per_kg).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {crops.length === 0 && <p>No crops found. Add crops through the backend API.</p>}
    </div>
  </section>
) : activePage === "Crops" ? (
  <section className="panel">
    <h2>Crop Management</h2>
    <p>View crop quantities, prices, and estimated values.</p>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Crop Name</th>
            <th>Quantity (kg)</th>
            <th>Price per kg (₹)</th>
            <th>Farmer ID</th>
            <th>Estimated Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td>{crop.id}</td>
              <td>{crop.name}</td>
              <td>{crop.quantity_kg}</td>
              <td>₹{crop.price_per_kg}</td>
              <td>{crop.farmer_id}</td>
              <td>
                ₹{(crop.quantity_kg * crop.price_per_kg).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {crops.length === 0 && <p>No crops found. Add crops through the backend API.</p>}
    </div>
  </section>
) : activePage === "Warehouses" ? (
  <section className="panel">
    <h2>Warehouse Management</h2>
    <p>Monitor capacity, stock levels, and available storage.</p>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Warehouse</th>
            <th>Location</th>
            <th>Capacity (kg)</th>
            <th>Current Stock (kg)</th>
            <th>Available (kg)</th>
            <th>Utilization</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => {
            const capacity = Number(warehouse.capacity_kg) || 0;
            const stock = Number(warehouse.current_stock_kg) || 0;
            const available = capacity - stock;
            const utilization =
              capacity > 0 ? (stock / capacity) * 100 : 0;

            return (
              <tr key={warehouse.id}>
                <td>{warehouse.id}</td>
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>{capacity.toLocaleString("en-IN")}</td>
                <td>{stock.toLocaleString("en-IN")}</td>
                <td>{available.toLocaleString("en-IN")}</td>
                <td>{utilization.toFixed(1)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {warehouses.length === 0 && (
        <p>No warehouses found in the database.</p>
      )}
    </div>
  </section>
) : activePage === "Inventory" ? (
  <section className="panel">
    <h2>Inventory Overview</h2>
    <p>Monitor available crops and warehouse storage capacity.</p>

    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Crop Quantity</h3>
        <p>
          {crops
            .reduce((total, crop) => total + (Number(crop.quantity_kg) || 0), 0)
            .toLocaleString("en-IN")} kg
        </p>
      </div>

      <div className="stat-card">
        <h3>Total Warehouse Capacity</h3>
        <p>
          {warehouses
            .reduce((total, warehouse) => total + (Number(warehouse.capacity_kg) || 0), 0)
            .toLocaleString("en-IN")} kg
        </p>
      </div>

      <div className="stat-card">
        <h3>Total Warehouse Stock</h3>
        <p>
          {warehouses
            .reduce((total, warehouse) => total + (Number(warehouse.current_stock_kg) || 0), 0)
            .toLocaleString("en-IN")} kg
        </p>
      </div>
    </div>

    <h3 style={{ marginTop: "28px" }}>Crop Inventory</h3>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Quantity (kg)</th>
            <th>Price per kg (₹)</th>
            <th>Estimated Value (₹)</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop.id}>
              <td>{crop.name}</td>
              <td>{Number(crop.quantity_kg || 0).toLocaleString("en-IN")}</td>
              <td>₹{Number(crop.price_per_kg || 0).toLocaleString("en-IN")}</td>
              <td>
                ₹{(
                  Number(crop.quantity_kg || 0) *
                  Number(crop.price_per_kg || 0)
                ).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {crops.length === 0 && <p>No crop inventory available.</p>}
    </div>
  </section>
) : activePage === "Optimization" ? (
  <OptimizationPage />
) : (
  <section className="panel page-placeholder">
    <div className="placeholder-icon">🌿</div>
    <h2>{activePage} Management</h2>
    <p>
      This section is ready for its next development step. We will
      connect it to your FastAPI backend.
    </p>
    <button
      className="back-button"
      onClick={() => setActivePage("Dashboard")}
    >
      ← Back to Dashboard
    </button>
  </section>
)}
  </main>
    </div>
  );
}

function OptimizationPage() {
  const [distance, setDistance] = useState(120);
  const [costPerKm, setCostPerKm] = useState(15);
  const [quantity, setQuantity] = useState(500);
  const [capacity, setCapacity] = useState(10000);
  const [stock, setStock] = useState(2500);
  const [price, setPrice] = useState(25);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  async function calculate(type) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      let response;

      if (type === "transport") {
        response = await api.post("/optimization/transport-cost", {
          distance_km: Number(distance),
          cost_per_km: Number(costPerKm),
          quantity_kg: Number(quantity),
        });
      } else if (type === "storage") {
        response = await api.post("/optimization/storage", {
          capacity_kg: Number(capacity),
          current_stock_kg: Number(stock),
        });
      } else {
        response = await api.post("/optimization/crop-value", {
          quantity_kg: Number(quantity),
          price_per_kg: Number(price),
        });
      }

      setResult({ type, data: response.data });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Could not calculate. Check that the backend is running and the API input matches the expected format."
      );
    } finally {
      setLoading(false);
    }
  }
  async function loadRecommendations() {
  setLoading(true);
  setError("");

  try {
    const response = await api.post("/optimization/recommendations", {
      capacity_kg: Number(capacity),
      current_stock_kg: Number(stock),
      distance_km: Number(distance),
      cost_per_km: Number(costPerKm),
      quantity_kg: Number(quantity),
    });

    setRecommendations(response.data.recommendations || []);
  } catch (err) {
    setError(
      err.response?.data?.detail ||
        "Could not load recommendations. Check that the backend is running."
    );
  } finally {
    setLoading(false);
  }
}

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    marginBottom: "14px",
    border: "1px solid #d6ded2",
    borderRadius: "8px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 16px",
    background: "#21834a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: 600,
  };

  const cardStyle = {
    background: "#fff",
    border: "1px solid #e1e8dc",
    borderRadius: "14px",
    padding: "20px",
    minWidth: 0,
  };

  return (
    <section className="panel">
      <h2>Intelligent Supply Chain Optimization</h2>
      <p>
        Analyze transport costs, warehouse utilization, and agricultural crop
        value using the optimization engine.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        <div style={cardStyle}>
          <h3>🚚 Transport Cost</h3>

          <label>
            Distance (km)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </label>

          <label>
            Cost per km (₹)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={costPerKm}
              onChange={(e) => setCostPerKm(e.target.value)}
            />
          </label>

          <label>
            Quantity (kg)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <button style={buttonStyle} onClick={() => calculate("transport")} disabled={loading}>
            Calculate Transport Cost
          </button>
        </div>

        <div style={cardStyle}>
          <h3>🏭 Warehouse Storage</h3>

          <label>
            Total Capacity (kg)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </label>

          <label>
            Current Stock (kg)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>

          <button style={buttonStyle} onClick={() => calculate("storage")} disabled={loading}>
            Analyze Storage
          </button>
        </div>

        <div style={cardStyle}>
          <h3>💰 Crop Valuation</h3>

          <label>
            Crop Quantity (kg)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>

          <label>
            Price per kg (₹)
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <button style={buttonStyle} onClick={() => calculate("value")} disabled={loading}>
            Calculate Crop Value
          </button>
        </div>
      </div>

      {loading && <p role="status">Calculating...</p>}

      {error && (
        <p role="alert" style={{ color: "#b42318", marginTop: "20px" }}>
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            ...cardStyle,
            marginTop: "24px",
            background: "#f1f8ed",
          }}
        >
          <h3>Calculation Result</h3>
          <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}

      <div
  style={{
    ...cardStyle,
    marginTop: "24px",
    background: "#f8faf5",
  }}
>
  <h3>🧠 Supply Chain Recommendations</h3>

  <p>
    Analyze your warehouse capacity and transport details to receive
    recommendations based on your current inputs.
  </p>

  <button
    onClick={loadRecommendations}
    disabled={loading}
    style={buttonStyle}
  >
    {loading ? "Generating..." : "Generate Recommendations"}
  </button>

  {recommendations.length > 0 && (
    <ul style={{ marginTop: "16px" }}>
      {recommendations.map((item, index) => (
        <li key={index} style={{ marginBottom: "12px" }}>
          <strong>{item.priority} Priority:</strong> {item.message}
        </li>
      ))}
    </ul>
  )}

  {recommendations.length === 0 && (
    <p style={{ marginTop: "12px" }}>
      Click the button to generate recommendations.
    </p>
  )}
</div>
    </section>
  );
}
export default App;


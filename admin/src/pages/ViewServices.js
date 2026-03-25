import React, { useEffect, useState } from "react";
import Axios from "axios";

function ViewServices() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    Axios.get("http://localhost:1337/api/admin/getservices")
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        console.log("Error fetching services:", err);
      });
  };

  const filteredServices = services.filter((item) => {
    return (
      item.provider_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.service_name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="content-wrapper">
      <div className="page-header" style={{ marginBottom: "20px" }}>
        <div>
          <h3 className="page-title" style={{ marginBottom: "6px" }}>
            Services
          </h3>
          <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
            View and manage all registered services
          </p>
        </div>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ marginBottom: 0 }}>
            <li className="breadcrumb-item">Manage Service</li>
            <li className="breadcrumb-item active" aria-current="page">
              View Services
            </li>
          </ol>
        </nav>
      </div>

      <div
        className="card"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          border: "none"
        }}
      >
        <div className="card-body" style={{ padding: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "20px"
            }}
          >
            <div>
              <h4
                className="card-title"
                style={{
                  marginBottom: "5px",
                  fontWeight: "600",
                  color: "#222"
                }}
              >
                Service List
              </h4>
              <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
                Total Services: <strong>{services.length}</strong>
              </p>
            </div>

            <div style={{ minWidth: "280px", maxWidth: "350px", width: "100%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by provider or service name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderRadius: "12px",
                  height: "45px",
                  border: "1px solid #dcdcdc",
                  boxShadow: "none"
                }}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table
              className="table table-hover"
              style={{
                marginBottom: 0,
                verticalAlign: "middle"
              }}
            >
              <thead style={{ background: "#f8f9fa" }}>
                <tr>
                  <th style={{ fontWeight: "600", color: "#333" }}>#</th>
                  <th style={{ fontWeight: "600", color: "#333" }}>Service Provider</th>
                  <th style={{ fontWeight: "600", color: "#333" }}>Service Name</th>
                  <th style={{ fontWeight: "600", color: "#333" }}>Service Date</th>
                </tr>
              </thead>

              <tbody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ fontWeight: "600", color: "#222" }}>
                        {item.provider_name}
                      </td>
                      <td>{item.service_name}</td>
                      <td>
                        {item.service_date
                          ? new Date(item.service_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                        color: "#777"
                      }}
                    >
                      No Services Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewServices;
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function ViewServiceProvider() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = () => {
    Axios.get("http://127.0.0.1:1337/api/getprovider")
      .then((response) => {
        setList(response.data);
      })
      .catch((err) => {
        console.log("API ERROR:", err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const approveProvider = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this provider",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(`http://127.0.0.1:1337/api/provider/approve/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Approved!",
              text: response.data.message || "Provider Approved Successfully",
              confirmButtonText: "OK"
            }).then(() => {
              loadData();
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Cannot Approve Provider", "error");
          });
      }
    });
  };

  const rejectProvider = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this provider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(`http://127.0.0.1:1337/api/provider/reject/${id}`)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Rejected!",
              text: response.data.message || "Provider Rejected Successfully",
              confirmButtonText: "OK"
            }).then(() => {
              loadData();
            });
          })
          .catch(() => {
            Swal.fire("Error!", "Cannot Reject Provider", "error");
          });
      }
    });
  };

  const filteredList = list.filter((val) => {
    return (
      val.provider_name?.toLowerCase().includes(search.toLowerCase()) ||
      val.email?.toLowerCase().includes(search.toLowerCase()) ||
      val.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      val.city?.toLowerCase().includes(search.toLowerCase()) ||
      val.contactno?.toString().includes(search)
    );
  });

  return (
    <div className="content-wrapper">
      <div className="page-header" style={{ marginBottom: "20px" }}>
        <div>
          <h3 className="page-title" style={{ marginBottom: "6px" }}>
            Service Provider List
          </h3>
          <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
            Manage and verify registered service providers
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
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
                    All Providers
                  </h4>
                  <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
                    Total Providers: <strong>{list.length}</strong>
                  </p>
                </div>

                <div style={{ minWidth: "280px", maxWidth: "350px", width: "100%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, business, city..."
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
                  <thead
                    style={{
                      background: "#f8f9fa"
                    }}
                  >
                    <tr>
                      <th style={{ fontWeight: "600", color: "#333" }}>#</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>Name</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>Contact</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>Email</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>Business</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>City</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>ID Proof</th>
                      <th style={{ fontWeight: "600", color: "#333" }}>Status / Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredList.length > 0 ? (
                      filteredList.map((val, index) => (
                        <tr key={val.provider_id}>
                          <td>{index + 1}</td>

                          <td style={{ fontWeight: "600", color: "#222" }}>
                            {val.provider_name}
                          </td>

                          <td>{val.contactno}</td>

                          <td>{val.email}</td>

                          <td>{val.business_name}</td>

                          <td>{val.city}</td>

                          <td>
                            <img
                              src={`http://127.0.0.1:1337/public/idproof/${val.id_proof}`}
                              alt="ID"
                              width="75"
                              height="75"
                              style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                                border: "1px solid #e5e5e5",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
                              }}
                            />
                          </td>

                          <td>
                            {val.status === 0 && (
                              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                <button
                                  className="btn btn-success btn-sm"
                                  style={{
                                    borderRadius: "8px",
                                    padding: "6px 14px",
                                    fontWeight: "500"
                                  }}
                                  onClick={() => approveProvider(val.provider_id)}
                                >
                                  Approve
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  style={{
                                    borderRadius: "8px",
                                    padding: "6px 14px",
                                    fontWeight: "500"
                                  }}
                                  onClick={() => rejectProvider(val.provider_id)}
                                >
                                  Reject
                                </button>
                              </div>
                            )}

                            {val.status === 1 && (
                              <span
                                className="badge badge-success"
                                style={{
                                  padding: "8px 14px",
                                  borderRadius: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Approved
                              </span>
                            )}

                            {val.status === 2 && (
                              <span
                                className="badge badge-danger"
                                style={{
                                  padding: "8px 14px",
                                  borderRadius: "20px",
                                  fontSize: "12px"
                                }}
                              >
                                Rejected
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center", padding: "30px", color: "#777" }}>
                          No service provider found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewServiceProvider;
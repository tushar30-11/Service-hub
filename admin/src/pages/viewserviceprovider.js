import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function ViewServiceProvider() {

  const [list, setList] = useState([]);

  // ================= FETCH DATA =================
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

  // ================= APPROVE =================
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

  // ================= REJECT =================
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

  return (
    <div className="content-wrapper">

      <div className="page-header">
        <h3 className="page-title">Service Provider List</h3>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Email</th>
                      <th>Business</th>
                      <th>City</th>
                      <th>ID Proof</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {list.map((val, index) => (
                      <tr key={val.provider_id}>
                        <td>{index + 1}</td>
                        <td>{val.provider_name}</td>
                        <td>{val.contactno}</td>
                        <td>{val.email}</td>
                        <td>{val.business_name}</td>
                        <td>{val.city}</td>

                        <td>
                          <img
                            src={`http://127.0.0.1:1337/public/idproof/${val.id_proof}`}
                            alt="ID"
                            width="70"
                            style={{ borderRadius: "6px" }}
                          />
                        </td>

                        <td>

                          {val.status === 0 && (
                            <>
                              <button
                                className="btn btn-success btn-sm mr-2"
                                onClick={() => approveProvider(val.provider_id)}
                              >
                                Approve
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => rejectProvider(val.provider_id)}
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {val.status === 1 && (
                            <span className="badge badge-success">Approved</span>
                          )}

                          {val.status === 2 && (
                            <span className="badge badge-danger">Rejected</span>
                          )}

                        </td>

                      </tr>
                    ))}
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
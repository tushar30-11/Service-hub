import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ViewRole() {

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    axios.get("http://localhost:1337/api/getroles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch(() => {
        console.log("Error fetching roles");
      });
  };

  const deleteRole = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "This role will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete"
    }).then((result) => {

      if (result.isConfirmed) {

        axios.delete(`http://localhost:1337/api/deleterole/${id}`)
          .then((res) => {

            if (res.data.success) {
              Swal.fire("Deleted!", "Role deleted successfully", "success");
              loadRoles();
            } else {
              Swal.fire("Error", res.data.message, "error");
            }

          })
          .catch(() => {
            Swal.fire("Error", "Delete failed", "error");
          });

      }

    });
  };

  return (
    <div className="main-content">
      <section className="section">

        <div className="row">
          <div className="col-12">

            <div className="card">
              <div className="card-header">
                <h4>View Roles</h4>
              </div>

              <div className="card-body">

                <div className="table-responsive">
                  <table className="table table-striped">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Role Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {roles.length > 0 ? (
                        roles.map((role, index) => (
                          <tr key={role.id}>
                            <td>{index + 1}</td>

                            {/* ✅ PREMIUM BADGE */}
                            <td>
                              <span className="badge badge-info" style={{
                                padding: "6px 12px",
                                fontSize: "14px"
                              }}>
                                {role.role_name}
                              </span>
                            </td>

                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteRole(role.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No roles added yet 🚫
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

      </section>
    </div>
  );
}

export default ViewRole;
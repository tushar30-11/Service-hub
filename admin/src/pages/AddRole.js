import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddRole() {

  const [roleName, setRoleName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ validation
    if (!roleName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please enter role name"
      });
      return;
    }

    axios.post("http://localhost:1337/api/addrole", {
      role_name: roleName.trim()
    })
    .then((res) => {

      if (res.data.success) {

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Role Added Successfully"
        }).then(() => {
          // ✅ redirect after add
          window.location = "/view-role";
        });

      } else {
        Swal.fire("Error", res.data.message, "error");
      }

    })
    .catch(() => {
      Swal.fire("Error", "Server Error", "error");
    });
  };

  return (
    <div className="main-content">
      <section className="section">

        <div className="row">
          <div className="col-12">

            <div className="card">
              <div className="card-header">
                <h4>Add Role</h4>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                    <label>Role Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter role (e.g. Technician)"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-primary mt-3">
                    Add Role
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>

      </section>
    </div>
  );
}

export default AddRole;
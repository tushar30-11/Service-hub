import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddStaff() {

  const user = JSON.parse(sessionStorage.getItem("mydata"));
  const provider_id = user?.provider_id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);

  // 🔥 LOAD ROLES FROM DB
  useEffect(() => {
    axios.get("http://localhost:1337/api/getroles")
      .then((res) => {
        setRoles(res.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !role_id) {
      Swal.fire("Warning", "Fill required fields", "warning");
      return;
    }

    axios.post("http://localhost:1337/api/provider/addstaff", {
      provider_id,
      name,
      email,
      phone,
      role_id   // ✅ IMPORTANT
    })
    .then((res) => {
      if (res.data.success) {
        Swal.fire("Success", "Staff Added", "success");
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
                <h4>Add Staff</h4>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" onChange={(e)=>setName(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <input className="form-control" onChange={(e)=>setPhone(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select className="form-control" onChange={(e)=>setRoleId(e.target.value)}>
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button className="btn btn-primary">Submit</button>

                </form>
              </div>

            </div>

          </div>
        </div>

      </section>
    </div>
  );
}

export default AddStaff;
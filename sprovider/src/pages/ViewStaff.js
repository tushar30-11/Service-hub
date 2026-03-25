import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewStaff() {

  const user = JSON.parse(sessionStorage.getItem("mydata"));
  const provider_id = user?.provider_id;

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:1337/api/provider/viewstaff", {
      provider_id
    })
    .then(res => setStaff(res.data));
  }, []);

  return (
    <div className="main-content">
      <section className="section">

        <div className="row">
          <div className="col-12">

            <div className="card">
              <div className="card-header">
                <h4>View Staff</h4>
              </div>

              <div className="card-body">

                <div className="table-responsive">
                  <table className="table table-striped">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      {staff.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index+1}</td>
                          <td>{item.name}</td>
                          <td>{item.phone}</td>
                          <td>
                            <span className="badge badge-info">
                              {item.role_name}
                            </span>
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

      </section>
    </div>
  );
}

export default ViewStaff;
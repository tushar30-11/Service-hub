import React, { useEffect, useState } from "react";
import Axios from "axios";

function ViewServices() {

  const [services, setServices] = useState([]);

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

  return (
    <>
      <div className="page-header">
        <h3 className="page-title">
          Services
        </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Manage Service</li>
            <li className="breadcrumb-item active" aria-current="page">
              View Services
            </li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Service List</h4>

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table id="order-listing" className="table">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Service Provider</th>
                      <th>Service Name</th>
                      <th>Service Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {services.length > 0 ? (
                      services.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.provider_name}</td>
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
                        <td colSpan="4" className="text-center">
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
      </div>
    </>
  );
}

export default ViewServices;
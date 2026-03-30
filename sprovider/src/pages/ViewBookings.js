import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewBookings() {

  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/providerbookings", {
      provider_id: user.provider_id
    })
    .then((res) => {
      setBookings(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const updateStatus = (booking_id, status) => {

    Axios.post("http://127.0.0.1:1337/api/updatebookingstatus", {
      booking_id: booking_id,
      status: status
    })
    .then(() => {

      const updatedBookings = bookings.map((b) => {
        if (b.booking_id === booking_id) {
          return { ...b, status: status };
        }
        return b;
      });

      setBookings(updatedBookings);

    })
    .catch((err) => {
      console.log(err);
    });

  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">

              <div className="card-header d-flex justify-content-between align-items-center">
                <h4>View Bookings</h4>
                <input
                  type="text"
                  className="form-control w-25"
                  placeholder="Search booking..."
                />
              </div>

              <div className="card-body">
                <div className="table-responsive">

                  <table className="table table-striped">

                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {bookings.length > 0 ? (

                        bookings.map((b, index) => (

                          <tr key={b.booking_id}>

                            <td>{index + 1}</td>
                            <td>{b.name}</td>
                            <td>{b.phone}</td>
                            <td>{b.service_name}</td>
                            <td>{b.booking_day}</td>
                            <td>{b.time_slot}</td>

                            {/* ✅ SHOW STAFF */}
                            <td>
                              {b.staff_name ? (
                                <span className="badge badge-success">
                                  {b.staff_name}
                                </span>
                              ) : (
                                <span className="badge badge-secondary">
                                  Not Assigned
                                </span>
                              )}
                            </td>

                            {/* STATUS */}
                            <td>

                              {b.status === 0 && (
                                <span className="badge badge-warning">Pending</span>
                              )}

                              {b.status === 1 && (
                                <span className="badge badge-success">Accepted</span>
                              )}

                              {b.status === 2 && (
                                <span className="badge badge-info">Completed</span>
                              )}

                              {b.status === 3 && (
                                <span className="badge badge-danger">Rejected</span>
                              )}

                            </td>

                            {/* ACTION */}
                            <td>

                              {/* PENDING */}
                              {b.status === 0 && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm mr-2"
                                    onClick={() => updateStatus(b.booking_id, 1)}
                                  >
                                    Accept
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => updateStatus(b.booking_id, 3)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}

                              {/* ACCEPTED */}
                              {b.status === 1 && (
                                <>
                                  <button
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={() => updateStatus(b.booking_id, 2)}
                                  >
                                    Complete
                                  </button>

                                  {/* 🔥 ASSIGN BUTTON */}
                                  {b.staff_id ? (
                                    <button
                                      className="btn btn-secondary btn-sm"
                                      disabled
                                    >
                                      Assigned
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-info btn-sm"
                                      onClick={() =>
                                        navigate("/assign-staff", {
                                          state: { booking: b }
                                        })
                                      }
                                    >
                                      Assign Staff
                                    </button>
                                  )}
                                </>
                              )}

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>
                          <td colSpan="9" className="text-center">
                            No bookings found
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

export default ViewBookings;
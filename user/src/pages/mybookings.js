import React, { useEffect, useState } from "react";
import Axios from "axios";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  // SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("userdata"));

  if (!user) {
    window.location = "/login";
  }

  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/mybookings", {
      user_id: user.user_id
    })
    .then((res) => {
      setBookings(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  return (

    <div className="container mt-5">

      <h2 className="mb-4 text-center">My Bookings</h2>

      <div className="card p-4">

        <div className="table-responsive">

          <table className="table table-bordered table-striped">

            <thead style={{background:"#4CAF0A", color:"#fff"}}>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {bookings.length > 0 ? (

                bookings.map((b, index) => (

                  <tr key={b.booking_id}>

                    <td>{index + 1}</td>

                    <td>{b.service_name}</td>

                    <td>{b.booking_day}</td>

                    <td>{b.time_slot}</td>

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

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5" className="text-center">
                    No bookings found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default MyBookings;
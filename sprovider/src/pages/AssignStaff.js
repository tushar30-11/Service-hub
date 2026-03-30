import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

function AssignStaff() {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const user = JSON.parse(sessionStorage.getItem("mydata"));
  const provider_id = user?.provider_id;

  const [staff, setStaff] = useState([]);
  const [staff_id, setStaffId] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FIX: useEffect ALWAYS TOP PE
  useEffect(() => {
    if (provider_id) {
      axios.post("http://localhost:1337/api/provider/viewstaff", {
        provider_id
      })
      .then((res) => {
        setStaff(res.data);
      });
    }
  }, [provider_id]);

  // ✅ NOW SAFE CHECK
  if (!booking) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Invalid Booking ❌</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/view-bookings")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAssign = async () => {

    if (!staff_id) {
      Swal.fire("Warning", "Select staff", "warning");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:1337/api/provider/assignstaff",
        {
          booking_id: booking.booking_id,
          staff_id: staff_id
        }
      );

      if (res.data.success) {

        Swal.fire("Success", "Staff Assigned", "success");

        navigate("/view-bookings");

      } else {
        Swal.fire("Error", "Assignment failed", "error");
      }

    } catch (err) {

      console.log(err);

      Swal.fire("Error", "Server error", "error");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="main-content">
      <section className="section">

        <div className="card">
          <div className="card-header">
            <h4>Assign Staff</h4>
          </div>

          <div className="card-body">

            <p><strong>Customer:</strong> {booking.name}</p>
            <p><strong>Service:</strong> {booking.service_name}</p>
            <p><strong>Date:</strong> {booking.booking_day}</p>

            <div className="form-group mt-3">
              <label>Select Staff</label>

              <select
                className="form-control"
                onChange={(e)=>setStaffId(e.target.value)}
              >
                <option value="">Select Staff</option>

                {staff.map((s) => (
                <option key={s.staff_id} value={s.staff_id}>
                    {s.name} ({s.role_name})
                </option>
                ))}
               </select>
            </div>

            <button
              className="btn btn-success mt-3"
              onClick={handleAssign}
              disabled={loading}
            >
              {loading ? "Assigning..." : "Assign Staff"}
            </button>

          </div>
        </div>

      </section>
    </div>
  );
}

export default AssignStaff;
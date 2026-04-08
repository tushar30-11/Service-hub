import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BookService() {

  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;

  const service_id = service?.service_id;
  const provider_id = service?.provider_id;
  const price = service?.price;
  const title = service?.service_name;

  const user = JSON.parse(sessionStorage.getItem("userdata"));

  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);

  if (!service_id || !provider_id) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Invalid Booking Data ❌</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/services")}
        >
          Go Back
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  // 🔥 PAYMENT FUNCTION (NEW)
  const handlePayment = async () => {

    if (!address.trim() || !date || !slot) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    if (!user) {
      Swal.fire("Error", "User not logged in", "error");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {

      // 🔥 CREATE ORDER
      const res = await Axios.post(
        "http://127.0.0.1:1337/api/createorder",
        { amount: price }
      );

      const options = {
        key: "rzp_test_SaY0UR8jNHBi3V",
        amount: res.data.amount,
        currency: "INR",
        name: "Service Hub",
        description: title,
        order_id: res.data.id,

        handler: async function () {

          // 🔥 PAYMENT SUCCESS → SAVE BOOKING
          await Axios.post(
            "http://127.0.0.1:1337/api/bookservice",
            {
              user_id: user.user_id,
              provider_id: provider_id,
              service_id: service_id,
              address: address,
              booking_day: date,
              time_slot: slot,
              payment_status: "Paid" 
            }
          );

          Swal.fire({
            icon: "success",
            title: "Payment Successful 🎉",
            text: "Booking Confirmed!"
          });

          navigate("/mybookings");
        },

        theme: {
          color: "#0084B4"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      console.log(error);

      Swal.fire(
        "Error",
        "Payment failed. Try again.",
        "error"
      );

    } finally {
      setLoading(false);
    }

  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">Book Service</h2>

      <div
        className="card p-4"
        style={{
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >

        <h4>{title}</h4>

        <p>
          <strong>Price :</strong>{" "}
          <span style={{ color: "#667eea" }}>₹{price}</span>
        </p>

        <p><strong>Name :</strong> {user?.name}</p>
        <p><strong>Phone :</strong> {user?.phone}</p>

        <div className="form-group">
          <label>Service Address</label>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter full address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
          />
        </div>

        <br/>

        <div className="form-group">
          <label>Select Date</label>

          <input
            type="date"
            className="form-control"
            min={today}
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />
        </div>

        <br/>

        <div className="form-group">
          <label>Select Time Slot</label>

          <select
            className="form-control"
            value={slot}
            onChange={(e)=>setSlot(e.target.value)}
          >
            <option value="">Select Time</option>
            <option value="Morning">Morning (8AM - 12PM)</option>
            <option value="Afternoon">Afternoon (12PM - 4PM)</option>
            <option value="Evening">Evening (4PM - 8PM)</option>
          </select>
        </div>

        <br/>

        {/* 🔥 SAME BUTTON UI (ONLY FUNCTION CHANGED) */}
        <button
          className="btn btn-success w-100"
          onClick={handlePayment}
          disabled={loading}
          style={{
            padding: "12px",
            fontWeight: "bold",
            borderRadius: "10px",
            background: loading ? "#aaa" : "#0084B4",
            border: "none"
          }}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

      </div>

    </div>

  );
}

export default BookService;
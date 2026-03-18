import React, { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BookService() {

const location = useLocation();
const navigate = useNavigate();

const service_id = location.state?.service_id;
const provider_id = location.state?.provider_id;
const price = location.state?.price;
const title = location.state?.title;

const user = JSON.parse(sessionStorage.getItem("userdata"));

const [address, setAddress] = useState("");
const [date, setDate] = useState("");
const [slot, setSlot] = useState("");

const bookNow = async () => {

    if (!address || !date || !slot) {
    Swal.fire("Error", "Please fill all fields", "error");
    return;
    }

    try {

    const response = await Axios.post(
        "http://127.0.0.1:1337/api/bookservice",
        {
        user_id: user.user_id,
        provider_id: provider_id,
        service_id: service_id,
        address: address,
        booking_day: date,
        time_slot: slot
        }
    );

    if (response.data.status === 1) {

        Swal.fire(
        "Success",
        "Service booked successfully",
        "success"
        );

        navigate("/services");

    }

    } catch (error) {
    console.log(error);
    }

};

return (

    <div className="container mt-5">

    <h2 className="mb-4">Book Service</h2>

    <div className="card p-4">

        <h4>{title}</h4>
        <p><strong>Price :</strong> ₹{price}</p>

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

        <button
        className="btn btn-success"
        onClick={bookNow}
        >
        Confirm Booking
        </button>

    </div>

    </div>

);
}

export default BookService;
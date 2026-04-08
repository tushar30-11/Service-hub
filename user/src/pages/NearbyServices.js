import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function NearbyServices() {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  // 🔥 NEW: RADIUS STATE (DEFAULT 20 KM)
  const [radius, setRadius] = useState(20);

  useEffect(() => {
    getUserLocation();
  }, []);

  // ===============================
  // GET USER LOCATION
  // ===============================
  const getUserLocation = () => {

    const savedLat = localStorage.getItem("user_lat");
    const savedLng = localStorage.getItem("user_lng");

    if (savedLat && savedLng) {
      fetchNearbyServices(savedLat, savedLng);
      return;
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        async (position) => {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          localStorage.setItem("user_lat", lat);
          localStorage.setItem("user_lng", lng);

          await saveUserLocation(lat, lng);

          fetchNearbyServices(lat, lng);
        },
        (error) => {
          console.log("Location denied", error);
          setLocationError(true);
          fetchNearbyServices(null, null);
        }
      );

    } else {
      Swal.fire("Error", "Geolocation not supported", "error");
    }
  };

  // ===============================
  // SAVE USER LOCATION
  // ===============================
  const saveUserLocation = async (lat, lng) => {

    const user = JSON.parse(sessionStorage.getItem("userdata"));
    if (!user) return;

    try {
      await axios.post(
        "http://localhost:1337/api/user/updatelocation",
        {
          user_id: user.user_id,
          latitude: lat,
          longitude: lng
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ===============================
  // BUTTON FUNCTION
  // ===============================
  const handleUseLocation = () => {

    if (!navigator.geolocation) {
      Swal.fire("Error", "Geolocation not supported", "error");
      return;
    }

    Swal.fire({
      title: "Getting your location...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    navigator.geolocation.getCurrentPosition(async (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      localStorage.setItem("user_lat", lat);
      localStorage.setItem("user_lng", lng);

      await saveUserLocation(lat, lng);

      fetchNearbyServices(lat, lng);

      Swal.fire("Success ✅", "Location updated!", "success");

    }, () => {
      Swal.fire("Error", "Permission denied", "error");
    });

  };

  // ===============================
  // FETCH SERVICES
  // ===============================
  const fetchNearbyServices = async (lat, lng) => {

    try {
      const res = await axios.post(
        "http://localhost:1337/api/nearbyservices",
        {
          latitude: lat,
          longitude: lng,
          radius: radius   // 🔥 NEW
        }
      );

      if (res.data.success) {
        setServices(res.data.data);
      }

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">

      <h2>Nearby Services</h2>

      {/* 🔥 SAME UI + NEW DROPDOWN */}
      <select 
        className="form-control mb-3"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      >
        <option value="5">Within 5 KM</option>
        <option value="10">Within 10 KM</option>
        <option value="20">Within 20 KM</option>
      </select>

      {/* BUTTON SAME */}
      <button 
        onClick={handleUseLocation} 
        className="btn btn-success mb-3"
      >
        📍 Use My Location
      </button>

      {locationError && (
        <p style={{ color: "red" }}>
          Location permission denied. Showing all services.
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : services.length === 0 ? (
        <p>No services found nearby</p>
      ) : (
        <div className="row">
          {services.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-3">

                <img
                  src={`http://localhost:1337/public/services/${item.service_image}`}
                  className="card-img-top"
                  alt="service"
                  height="200"
                />

                <div className="card-body">
                  <h5>{item.service_name}</h5>
                  <p>Provider: {item.provider_name}</p>
                  <p>Price: ₹{item.price}</p>

                  {item.distance && (
                    <p style={{ color: "green" }}>
                      {item.distance.toFixed(2)} km away
                    </p>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default NearbyServices;
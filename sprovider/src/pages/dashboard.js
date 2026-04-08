import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function Dashboard() {
  const [totalCategory, setTotalCategory] = useState(0);
  const [totalService, setTotalService] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  useEffect(() => {
    if (user && user.provider_id) {
      loadDashboardData();
      autoSetLocation(); // 🔥 AUTO LOCATION
    }
  }, []);

  const loadDashboardData = () => {
    Axios.post("http://localhost:1337/api/provider/dashboard/categorycount", {
      provider_id: user.provider_id
    })
      .then((response) => {
        setTotalCategory(
          response.data && response.data[0] ? response.data[0].totalcategory : 0
        );
      })
      .catch((err) => {
        console.log("Category count error:", err);
      });

    Axios.post("http://localhost:1337/api/provider/dashboard/servicecount", {
      provider_id: user.provider_id
    })
      .then((response) => {
        setTotalService(
          response.data && response.data[0] ? response.data[0].totalservice : 0
        );
      })
      .catch((err) => {
        console.log("Service count error:", err);
      });

    Axios.post("http://localhost:1337/api/provider/dashboard/bookingcount", {
      provider_id: user.provider_id
    })
      .then((response) => {
        setTotalBooking(
          response.data && response.data[0] ? response.data[0].totalbooking : 0
        );
      })
      .catch((err) => {
        console.log("Booking count error:", err);
      });
  };

  // ===============================
  // 🔥 AUTO LOCATION (FIRST TIME ONLY)
  // ===============================
  const autoSetLocation = () => {

    const savedLat = localStorage.getItem("provider_lat");
    const savedLng = localStorage.getItem("provider_lng");

    if (savedLat && savedLng) {
      console.log("Using saved location");
      return;
    }

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        localStorage.setItem("provider_lat", lat);
        localStorage.setItem("provider_lng", lng);

        try {
          await Axios.post(
            "http://localhost:1337/api/provider/updatelocation",
            {
              provider_id: user.provider_id,
              latitude: lat,
              longitude: lng
            }
          );
        } catch (err) {
          console.log(err);
        }

      });

    }

  };

  // ===============================
  // 🔥 MANUAL LOCATION BUTTON
  // ===============================
  const setLocation = () => {

    if (!navigator.geolocation) {
      Swal.fire("Error", "Geolocation not supported", "error");
      return;
    }

    Swal.fire({
      title: "Getting your location...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    navigator.geolocation.getCurrentPosition(async (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const res = await Axios.post(
          "http://localhost:1337/api/provider/updatelocation",
          {
            provider_id: user.provider_id,
            latitude: lat,
            longitude: lng
          }
        );

        localStorage.setItem("provider_lat", lat);
        localStorage.setItem("provider_lng", lng);

        if (res.data.success) {
          Swal.fire("Success ✅", "Location updated successfully!", "success");
        } else {
          Swal.fire("Error", "Update failed", "error");
        }

      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Server error", "error");
      }

    }, () => {
      Swal.fire("Error", "Location permission denied", "error");
    });

  };

  return (
    <>
      <div className="main-content">
        <section
          className="section"
          style={{
            padding: "20px 10px 10px 10px",
            background: "linear-gradient(to bottom, #f8fbff, #eef4ff)",
            minHeight: "100vh"
          }}
        >
          <style>
            {`
              .premium-dashboard-title {
                font-size: 30px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 6px;
              }

              .premium-dashboard-subtitle {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 0;
              }

              .premium-stat-card {
                position: relative;
                border: none;
                border-radius: 24px;
                overflow: hidden;
                transition: all 0.35s ease;
                min-height: 220px;
                box-shadow: 0 15px 35px rgba(15, 23, 42, 0.10);
                backdrop-filter: blur(12px);
              }

              .premium-stat-card:hover {
                transform: translateY(-8px) scale(1.01);
                box-shadow: 0 22px 45px rgba(15, 23, 42, 0.16);
              }

              .premium-card-inner {
                padding: 28px 24px;
                min-height: 220px;
                display: flex;
                align-items: center;
                position: relative;
                z-index: 2;
              }

              .premium-badge {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 30px;
                font-size: 12px;
                font-weight: 600;
                background: rgba(255,255,255,0.22);
                color: #fff;
                margin-bottom: 14px;
                letter-spacing: 0.3px;
              }

              .premium-label {
                font-size: 16px;
                font-weight: 600;
                color: #fff;
                margin-bottom: 8px;
              }

              .premium-value {
                font-size: 36px;
                font-weight: 800;
                color: #fff;
                line-height: 1;
                margin-bottom: 12px;
              }

              .premium-desc {
                font-size: 14px;
                color: rgba(255,255,255,0.88);
                margin-bottom: 0;
              }

              .premium-img-wrap {
                width: 95px;
                height: 95px;
                border-radius: 22px;
                background: rgba(255,255,255,0.18);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.15);
              }

              .premium-stat-img {
                width: 72px;
                height: 72px;
                object-fit: contain;
                filter: drop-shadow(0 8px 15px rgba(0,0,0,0.18));
              }

              .premium-glow {
                position: absolute;
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background: rgba(255,255,255,0.14);
                top: -40px;
                right: -30px;
                z-index: 1;
              }

              .welcome-box {
                background: rgba(255,255,255,0.75);
                border: 1px solid rgba(255,255,255,0.8);
                border-radius: 24px;
                padding: 24px;
                margin-bottom: 28px;
                box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
                backdrop-filter: blur(10px);
              }

              .welcome-highlight {
                color: #4f46e5;
                font-weight: 700;
              }
            `}
          </style>

          <div className="welcome-box">
            <h2 className="premium-dashboard-title">
              Welcome back{user && user.provider_name ? `, ${user.provider_name}` : ""}
            </h2>
            <p className="premium-dashboard-subtitle">
              Here is a quick overview of your <span className="welcome-highlight">SERVICE HUB</span> performance.
            </p>

            <button onClick={setLocation} className="btn btn-primary mt-3">
              📍 Set My Location
            </button>
          </div>

          <div className="row">

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="premium-stat-card" style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}>
                <div className="premium-glow"></div>
                <div className="premium-card-inner">
                  <div>
                    <span className="premium-badge">Overview</span>
                    <h5 className="premium-label">Total Category</h5>
                    <h2 className="premium-value">{totalCategory}</h2>
                    <p className="premium-desc">Your active service categories</p>
                  </div>
                  <div className="premium-img-wrap">
                    <img className="premium-stat-img" src="assets/img/banner/4.png" alt="category"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="premium-stat-card" style={{ background: "linear-gradient(135deg, #11998e, #38ef7d)" }}>
                <div className="premium-glow"></div>
                <div className="premium-card-inner">
                  <div>
                    <span className="premium-badge">Performance</span>
                    <h5 className="premium-label">Total Service</h5>
                    <h2 className="premium-value">{totalService}</h2>
                    <p className="premium-desc">Services listed by you</p>
                  </div>
                  <div className="premium-img-wrap">
                    <img className="premium-stat-img" src="assets/img/banner/3.png" alt="service"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 mb-4">
              <div className="premium-stat-card" style={{ background: "linear-gradient(135deg, #ff6a00, #ee0979)" }}>
                <div className="premium-glow"></div>
                <div className="premium-card-inner">
                  <div>
                    <span className="premium-badge">Bookings</span>
                    <h5 className="premium-label">Total Booking</h5>
                    <h2 className="premium-value">{totalBooking}</h2>
                    <p className="premium-desc">Bookings received</p>
                  </div>
                  <div className="premium-img-wrap">
                    <img className="premium-stat-img" src="assets/img/banner/1.png" alt="booking"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
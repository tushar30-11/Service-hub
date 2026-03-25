import React, { useEffect, useState } from "react";
import Axios from "axios";

function Dashboard() {
  const [list, setlist] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    const admin = sessionStorage.getItem("admindata");
    if (!admin) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/countservice")
      .then((response) => {
        setlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total service provider:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/countcategory")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total category:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/countservices")
      .then((response) => {
        setServicesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total services:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/countbookings")
      .then((response) => {
        setBookingsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total bookings:", error);
      });
  }, []);

  return (
    <main>
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">Dashboard</h3>
        </div>

        {/* PREMIUM TOP CARDS */}
        <div
          className="row mb-4"
          style={{
            marginTop: "50px"
          }}
        >
          <div className="col-md-6 col-xl-3 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "20px",
                padding: "25px",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(102, 126, 234, 0.30)",
                transition: "0.3s ease",
                cursor: "pointer",
                minHeight: "170px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 35px rgba(102, 126, 234, 0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(102, 126, 234, 0.30)";
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "18px"
                }}
              >
                <i className="fa fa-user"></i>
              </div>
              <p style={{ margin: 0, fontSize: "15px", opacity: "0.95" }}>
                Total Service Provider
              </p>
              <h2 style={{ margin: "10px 0 0 0", fontWeight: "700", fontSize: "34px" }}>
                {list && list[0] ? list[0].totalservice : 0}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
                borderRadius: "20px",
                padding: "25px",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(24, 90, 157, 0.30)",
                transition: "0.3s ease",
                cursor: "pointer",
                minHeight: "170px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 35px rgba(24, 90, 157, 0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(24, 90, 157, 0.30)";
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "18px"
                }}
              >
                <i className="fa fa-th-large"></i>
              </div>
              <p style={{ margin: 0, fontSize: "15px", opacity: "0.95" }}>
                Total Category
              </p>
              <h2 style={{ margin: "10px 0 0 0", fontWeight: "700", fontSize: "34px" }}>
                {categoryList && categoryList[0] ? categoryList[0].totalcategory : 0}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #f7971e, #ffd200)",
                borderRadius: "20px",
                padding: "25px",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(247, 151, 30, 0.30)",
                transition: "0.3s ease",
                cursor: "pointer",
                minHeight: "170px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 35px rgba(247, 151, 30, 0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(247, 151, 30, 0.30)";
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "18px"
                }}
              >
                <i className="fa fa-cogs"></i>
              </div>
              <p style={{ margin: 0, fontSize: "15px", opacity: "0.95" }}>
                Total Services
              </p>
              <h2 style={{ margin: "10px 0 0 0", fontWeight: "700", fontSize: "34px" }}>
                {servicesList && servicesList[0] ? servicesList[0].totalservices : 0}
              </h2>
            </div>
          </div>

          <div className="col-md-6 col-xl-3 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #ff512f, #dd2476)",
                borderRadius: "20px",
                padding: "25px",
                color: "#fff",
                boxShadow: "0 12px 30px rgba(221, 36, 118, 0.30)",
                transition: "0.3s ease",
                cursor: "pointer",
                minHeight: "170px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 18px 35px rgba(221, 36, 118, 0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(221, 36, 118, 0.30)";
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "18px"
                }}
              >
                <i className="fa fa-calendar"></i>
              </div>
              <p style={{ margin: 0, fontSize: "15px", opacity: "0.95" }}>
                Total Bookings
              </p>
              <h2 style={{ margin: "10px 0 0 0", fontWeight: "700", fontSize: "34px" }}>
                {bookingsList && bookingsList[0] ? bookingsList[0].totalbookings : 0}
              </h2>
            </div>
          </div>
        </div>

        {/* REST OF DASHBOARD */}
        <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="fas fa-gift"></i>
                  Orders
                </h4>
                <canvas id="orders-chart"></canvas>
                <div id="orders-chart-legend" className="orders-chart-legend"></div>
              </div>
            </div>
          </div>

          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="fas fa-chart-line"></i>
                  Sales
                </h4>
                <h2 className="mb-5">
                  56000 <span className="text-muted h4 font-weight-normal">Sales</span>
                </h2>
                <canvas id="sales-chart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">
                  <i className="fas fa-chart-pie"></i>
                  Sales status
                </h4>
                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <canvas id="sales-status-chart" className="mt-3"></canvas>
                  <div className="pt-4">
                    <div id="sales-status-chart-legend" className="sales-status-chart-legend"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="far fa-futbol"></i>
                  Activity
                </h4>
                <ul className="solid-bullet-list">
                  <li>
                    <h5>
                      4 people shared a post
                      <span className="float-right text-muted font-weight-normal small">8:30 AM</span>
                    </h5>
                    <p className="text-muted">It was an awesome work!</p>
                    <div className="image-layers">
                      <div className="img-sm profile-image-text bg-warning rounded-circle image-layer-item">M</div>
                      <img className="img-sm rounded-circle image-layer-item" src="images/faces/face3.jpg" alt="profile" />
                      <img className="img-sm rounded-circle image-layer-item" src="images/faces/face5.jpg" alt="profile" />
                      <img className="img-sm rounded-circle image-layer-item" src="images/faces/face8.jpg" alt="profile" />
                    </div>
                  </li>
                  <li>
                    <h5>
                      Stella posted in a group
                      <span className="float-right text-muted font-weight-normal small">11:40 AM</span>
                    </h5>
                    <p className="text-muted">The team has done a great job</p>
                  </li>
                  <li>
                    <h5>
                      Dobrick posted in material
                      <span className="float-right text-muted font-weight-normal small">4:30 PM</span>
                    </h5>
                    <p className="text-muted">Great work. Keep it up!</p>
                  </li>
                </ul>
                <div className="border-top pt-3">
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-dark">More</button>
                    <button className="btn btn-primary btn-icon-text">
                      Add new task
                      <i className="btn-icon-append fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">
                  <i className="fas fa-tachometer-alt"></i>
                  Daily Sales
                </h4>
                <p className="card-description">Daily sales for the past one month</p>
                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <canvas id="daily-sales-chart" className="mt-3 mb-3 mb-md-0"></canvas>
                  <div id="daily-sales-chart-legend" className="daily-sales-chart-legend pt-4 border-top"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
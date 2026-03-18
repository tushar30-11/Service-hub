import React from "react";

function Dashboard() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  return (
    <>
      <div className="main-content">
        <section className="section">

          {/* COMMON STYLE FOR ALL CARDS */}
          <style>
            {`
              .stat-card-body {
                min-height: 180px;
                display: flex;
                align-items: center;
              }
              .stat-img {
                width: 100%;
                max-height: 120px;
                object-fit: contain;
              }
            `}
          </style>

          <div className="row">

            {/* ===== CARD 1 → TOTAL CATEGORY ===== */}
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card">
                <div className="card-statistic-4 stat-card-body">
                  <div className="row w-100 align-items-center">
                    <div className="col-7 pt-3">
                      <h5 className="font-15">Total Category</h5>
                      <h2 className="mb-3 font-18">48</h2>
                      <p className="mb-0"><span className="col-green">12%</span> Increase</p>
                    </div>
                    <div className="col-5 text-center">
                      <img className="stat-img" src="assets/img/banner/4.png" alt="category" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CARD 2 → TOTAL SERVICE ===== */}
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card">
                <div className="card-statistic-4 stat-card-body">
                  <div className="row w-100 align-items-center">
                    <div className="col-7 pt-3">
                      <h5 className="font-15">Total Service</h5>
                      <h2 className="mb-3 font-18">128</h2>
                      <p className="mb-0"><span className="col-green">18%</span> Increase</p>
                    </div>
                    <div className="col-5 text-center">
                      <img className="stat-img" src="assets/img/banner/3.png" alt="service" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CARD 3 → TOTAL BOOKING ===== */}
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card">
                <div className="card-statistic-4 stat-card-body">
                  <div className="row w-100 align-items-center">
                    <div className="col-7 pt-3">
                      <h5 className="font-15">Total Booking</h5>
                      <h2 className="mb-3 font-18">258</h2>
                      <p className="mb-0"><span className="col-green">10%</span> Increase</p>
                    </div>
                    <div className="col-5 text-center">
                      <img className="stat-img" src="assets/img/banner/1.png" alt="booking" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== CARD 4 → TOTAL USERS ===== */}
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="card">
                <div className="card-statistic-4 stat-card-body">
                  <div className="row w-100 align-items-center">
                    <div className="col-7 pt-3">
                      <h5 className="font-15">Total Users</h5>
                      <h2 className="mb-3 font-18">1,287</h2>
                      <p className="mb-0"><span className="col-orange">09%</span> Decrease</p>
                    </div>
                    <div className="col-5 text-center">
                      <img className="stat-img" src="assets/img/banner/2.png" alt="users" />
                    </div>
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
import React from "react";

function Sidebar() {
  return (
    <>
      <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
          <div className="sidebar-brand">
            <a href="/">
             
              <span className="logo-name">Service Hub</span>
            </a>
          </div>

          <ul className="sidebar-menu">
            <li className="menu-header">MAIN</li>

            {/* DASHBOARD */}
            <li className="dropdown active">
              <a href="/" className="nav-link">
                <i className="fa fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>

            {/* ===== SERVICE CATEGORY (FIXED) ===== */}
            <li className="dropdown">
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="menu-toggle nav-link has-dropdown"
              >
                <i className="fa fa-list"></i>
                <span>Add Service Category</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="nav-link" href="/add-category">
                    Add Category
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/view-category">
                    View Category
                  </a>
                </li>
              </ul>
            </li>

            {/* ===== MANAGE SERVICES ===== */}
            <li className="dropdown">
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="menu-toggle nav-link has-dropdown"
              >
                <i className="fa fa-cog"></i>
                <span>Manage Services</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="nav-link" href="/add-service">
                    Add Service
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/view-services">
                    View Services
                  </a>
                </li>
              </ul>
            </li>

            {/* ===== MANAGE BOOKING ===== */}
            <li className="dropdown">
              <a
                href="/"
                onClick={(e) => e.preventDefault()}
                className="menu-toggle nav-link has-dropdown"
              >
                <i className="fa fa-calendar-check"></i>
                <span>Manage Booking</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="nav-link" href="/view-bookings">
                    View Booking
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;

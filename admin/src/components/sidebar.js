import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {

  const [openServiceProvider, setOpenServiceProvider] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  // ✅ NEW STATE
  const [openRole, setOpenRole] = useState(false);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">

        {/* Profile Section */}
        <li className="nav-item nav-profile">
          <div className="nav-link">
            <div className="profile-image">
              <img src="images/faces/face5.jpg" alt="profile" />
            </div>
            <div className="profile-name">
              <p className="name">Welcome Jane</p>
              <p className="designation">Super Admin</p>
            </div>
          </div>
        </li>

        {/* Dashboard */}
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fa fa-home menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        {/* Manage Service Provider */}
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={() => setOpenServiceProvider(!openServiceProvider)}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-users menu-icon"></i>
            <span className="menu-title">Manage Service Provider</span>
            <i className="menu-arrow"></i>
          </div>

          {openServiceProvider && (
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/viewserviceprovider">
                  View Service Provider
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Manage Service */}
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={() => setOpenService(!openService)}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-cogs menu-icon"></i>
            <span className="menu-title">Manage Service</span>
            <i className="menu-arrow"></i>
          </div>

          {openService && (
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/viewservice">
                  View Service
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* ✅ NEW: Manage Role */}
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={() => setOpenRole(!openRole)}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-user-tag menu-icon"></i>
            <span className="menu-title">Manage Role</span>
            <i className="menu-arrow"></i>
          </div>

          {openRole && (
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/add-role">
                  Add Role
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/view-role">
                  View Role
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Manage Slider */}
        <li className="nav-item">
          <div
            className="nav-link"
            onClick={() => setOpenSlider(!openSlider)}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-images menu-icon"></i>
            <span className="menu-title">Manage Slider</span>
            <i className="menu-arrow"></i>
          </div>

          {openSlider && (
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link className="nav-link" to="/viewslider">
                  View Slider
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/addslider">
                  Add Slider
                </Link>
              </li>
            </ul>
          )}
        </li>

      </ul>
    </nav>
  );
}

export default Sidebar;
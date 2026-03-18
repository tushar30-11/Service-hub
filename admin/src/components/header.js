import adminPic from "../assets/admin.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("admindata");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row default-layout-navbar">

        {/* ===== LOGO ===== */}
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          
          <button type="button" className="navbar-brand brand-logo btn btn-link p-0">
            <h3 style={{margin:"0", fontWeight:"700", color:"#6C2BD9"}}>
              Service Hub
            </h3>
          </button>

          <button type="button" className="navbar-brand brand-logo-mini btn btn-link p-0">
            <span style={{fontWeight:"700", color:"#6C2BD9"}}>SH</span>
          </button>

        </div>

        <div className="navbar-menu-wrapper d-flex align-items-stretch">

          <button className="navbar-toggler align-self-center" type="button">
            <span className="fas fa-bars"></span>
          </button>

          {/* SEARCH */}
          <ul className="navbar-nav">
            <li className="nav-item nav-search d-none d-md-flex">
              <div className="nav-link">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search" 
                  />
                </div>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav navbar-nav-right">

            {/* CREATE BUTTON */}
            <li className="nav-item d-none d-lg-flex">
              <button className="nav-link btn btn-primary">
                + Create new
              </button>
            </li>

            {/* LANGUAGE */}
            <li className="nav-item dropdown d-none d-lg-flex">
              <div className="nav-link">
                <button className="dropdown-toggle btn btn-outline-dark">
                  English
                </button>
              </div>
            </li>

            {/* PROFILE */}
            <li className="nav-item nav-profile position-relative">

              <button 
                className="nav-link btn btn-link p-0"
                type="button"
                onClick={() => setOpen(!open)}
              >
                <img 
                  src={adminPic} 
                  alt="profile" 
                  style={{
                    width:"35px",
                    height:"35px",
                    borderRadius:"50%"
                  }}
                />
              </button>

              {open && (
                <div 
                  className="dropdown-menu dropdown-menu-right navbar-dropdown show"
                  style={{ display: "block", position: "absolute", right: 0 }}
                >

                  <button className="dropdown-item">
                    <i className="fas fa-cog text-primary"></i>
                    Settings
                  </button>

                  <div className="dropdown-divider"></div>

                  <button 
                    className="dropdown-item"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-power-off text-primary"></i>
                    Logout
                  </button>

                </div>
              )}

            </li>

          </ul>

        </div>
      </nav>
    </div>
  );
}

export default Header;
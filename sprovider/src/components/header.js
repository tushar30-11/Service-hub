import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("mydata"));

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("mydata");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .premium-navbar {
            background: rgba(255, 255, 255, 0.78) !important;
            backdrop-filter: blur(14px);
            -webkit-backdrop-filter: blur(14px);
            box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
            border-bottom: 1px solid rgba(255,255,255,0.55);
            padding: 10px 18px;
          }

          .premium-navbar .nav-link {
            transition: all 0.3s ease;
          }

          .premium-navbar .collapse-btn,
          .premium-navbar .fullscreen-btn {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(79, 70, 229, 0.08);
            color: #4f46e5 !important;
            margin-right: 8px;
          }

          .premium-navbar .collapse-btn:hover,
          .premium-navbar .fullscreen-btn:hover {
            background: rgba(79, 70, 229, 0.15);
            transform: translateY(-2px);
          }

          .premium-search-wrap {
            position: relative;
            display: flex;z
            align-items: center;
            background: rgba(255,255,255,0.9);
            border: 1px solid #e9eef7;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
          }

          .premium-search-input {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
            background: transparent !important;
            height: 44px;
            padding: 10px 14px;
            min-width: 230px;
            font-size: 14px;
            color: #374151;
          }

          .premium-search-input::placeholder {
            color: #94a3b8;
          }

          .premium-search-btn {
            border: none;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            width: 46px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s ease;
          }

          .premium-search-btn:hover {
            filter: brightness(1.05);
          }

          .premium-user-trigger {
            background: rgba(255,255,255,0.9);
            border: 1px solid #edf1f7;
            border-radius: 16px;
            padding: 6px 12px 6px 8px !important;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
            display: flex !important;
            align-items: center;
            gap: 10px;
          }

          .premium-user-trigger:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 22px rgba(15, 23, 42, 0.09);
          }

          .premium-user-img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid rgba(102, 126, 234, 0.18);
          }

          .premium-user-name {
            font-weight: 600;
            color: #1f2937;
            font-size: 14px;
          }

          .premium-dropdown {
            border: none !important;
            border-radius: 18px !important;
            overflow: hidden;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14) !important;
            padding: 10px 0 !important;
            min-width: 240px;
            margin-top: 12px !important;
          }

          .premium-dropdown-title {
            padding: 10px 18px 14px 18px;
            font-size: 14px;
            font-weight: 600;
            color: #111827;
            border-bottom: 1px solid #f1f5f9;
            margin-bottom: 4px;
          }

          .premium-dropdown .dropdown-item {
            padding: 11px 18px !important;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            transition: 0.25s ease;
          }

          .premium-dropdown .dropdown-item i {
            margin-right: 10px;
            color: #667eea;
          }

          .premium-dropdown .dropdown-item:hover {
            background: #f8faff;
            color: #111827;
            padding-left: 22px !important;
          }

          .premium-logout {
            color: #dc2626 !important;
          }

          .premium-logout i {
            color: #dc2626 !important;
          }

          @media (max-width: 991px) {
            .premium-search-input {
              min-width: 150px;
            }
          }

          @media (max-width: 767px) {
            .premium-search-wrap {
              display: none;
            }

            .premium-user-name {
              display: none;
            }

            .premium-user-trigger {
              padding: 6px 8px !important;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg main-navbar sticky premium-navbar">
        <div className="form-inline mr-auto">
          <ul className="navbar-nav mr-3 align-items-center">
            {/* <li>
              <a
                href="#"
                data-toggle="sidebar"
                className="nav-link nav-link-lg collapse-btn"
                onClick={(e) => e.preventDefault()}
              >
                <i data-feather="align-justify"></i>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="nav-link nav-link-lg fullscreen-btn"
                onClick={(e) => e.preventDefault()}
              >
                <i data-feather="maximize"></i>
              </a>
            </li> */}

            <li>
              <form
                className="form-inline mr-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="premium-search-wrap">
                  <input
                    className="form-control premium-search-input"
                    type="search"
                    placeholder="Search here..."
                    aria-label="Search"
                  />
                  <button className="premium-search-btn" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav navbar-right">
          <li className="dropdown">
            <a
              href="#"
              data-toggle="dropdown"
              className="nav-link dropdown-toggle nav-link-lg nav-link-user premium-user-trigger"
              onClick={(e) => e.preventDefault()}
            >
              <img
                alt="image"
                src="assets/img/user.png"
                className="premium-user-img"
              />
              <span className="d-sm-none d-lg-inline-block premium-user-name">
                {user ? user.provider_name : "Guest"}
              </span>
            </a>

            <div className="dropdown-menu dropdown-menu-right pullDown premium-dropdown">
              <div className="dropdown-title premium-dropdown-title">
                Hello {user ? user.provider_name : "Guest"}
              </div>

              <Link to="/profile" className="dropdown-item has-icon">
                <i className="far fa-user"></i> Profile
              </Link>

              <a
                href="#"
                className="dropdown-item has-icon"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-cog"></i> Settings
              </a>

              <div className="dropdown-divider"></div>

              <a
                href="#"
                className="dropdown-item has-icon premium-logout"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
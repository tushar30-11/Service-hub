import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // REQUIRED FIELD VALIDATION
    if (!loginData.email || !loginData.password) {
      Swal.fire({
        icon: "warning",
        title: "All fields required",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    // EMAIL FORMAT VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(loginData.email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    try {

      setLoading(true);

      const response = await fetch("http://127.0.0.1:1337/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      setLoading(false);

      if (data.success) {

        const userData = {
          user_id: data.user.user_id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone
        };

        // session storage
        sessionStorage.setItem("userdata", JSON.stringify(userData));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${userData.name}`,
          confirmButtonColor: "#4CAF0A"
        }).then(() => {
          navigate("/");
        });

      } else {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message,
          confirmButtonColor: "#d33"
        });

      }

    } catch (error) {

      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong!",
        confirmButtonColor: "#d33"
      });

    }
  };

  return (
    <div className="padding ptb-xs-40 page-signin">
      <div className="container">
        <div className="main-body">
          <div className="body-inner">
            <div className="card bg-white">
              <div className="card-content">

                <h2 className="text-center">Login</h2>

                <form onSubmit={handleSubmit}>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={loginData.email}
                    onChange={handleChange}
                  />
                  <br />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={loginData.password}
                    onChange={handleChange}
                  />

                  {/* FORGOT PASSWORD LINK */}

                  <div style={{ textAlign: "right", marginTop: "5px" }}>
                    <Link to="/forgotpassword" style={{ color: "#4CAF0A", fontSize: "14px" }}>
                      Forgot Password?
                    </Link>
                  </div>

                  <br />

                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Sign In"}
                  </button>

                </form>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  Don’t have an account?{" "}
                  <Link to="/register" style={{ color: "#4CAF0A", fontWeight: "600" }}>
                    Register
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
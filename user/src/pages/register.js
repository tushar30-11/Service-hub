import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ===== REQUIRED FIELD VALIDATION =====
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "All fields required",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    // ===== USERNAME VALIDATION =====
    if (formData.name.length < 3) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Username",
        text: "Username must be at least 3 characters",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    // ===== EMAIL VALIDATION =====
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    // ===== PHONE VALIDATION =====
    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(formData.phone)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Phone Number",
        text: "Phone number must be exactly 10 digits",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    // ===== PASSWORD VALIDATION =====
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must contain Uppercase, Lowercase, Number & Special character (min 8 characters)",
        confirmButtonColor: "#4CAF0A"
      });
      return;
    }

    try {

      setLoading(true);

      const response = await fetch("http://127.0.0.1:1337/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setLoading(false);

      if (data.success) {

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You can now login",
          confirmButtonColor: "#4CAF0A"
        }).then(() => {
          navigate("/login");
        });

      } else {

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
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

                <section className="logo text-center">
                  <h2>Register</h2>
                </section>

                <form onSubmit={handleSubmit}>

                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <br />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <br />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Contact Number"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <br />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <br />

                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Sign Up"}
                  </button>

                </form>

                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#4CAF0A", fontWeight: "600" }}>
                    LOGIN
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
export default Register;    
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const admin = sessionStorage.getItem("admindata");

    if (admin && window.location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    Axios.post("http://localhost:1337/api/admin/login", {
      email,
      password
    })
    .then((res) => {

      if (res.data.success) {

        const data = {
          admin_id: res.data.admin.admin_id,
          admin_name: res.data.admin.name,
          email: res.data.admin.email
        };

        // Save in sessionStorage
        sessionStorage.setItem("admindata", JSON.stringify(data));

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome Admin 👋",
          confirmButtonColor: "#3085d6"
        }).then(() => {
          navigate("/dashboard", { replace: true });
        });

      } else {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.data.message
        });

      }

    })
    .catch((err) => {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Backend not running"
      });
    });
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth">
          <div className="row w-100">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">

                <h4 className="text-center mb-4 text-muted">
                  Admin Login
                </h4>

                <form className="pt-3" autoComplete="off" onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>

                  {/* Button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Login
                    </button>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
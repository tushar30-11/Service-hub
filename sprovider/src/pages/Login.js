import React, { useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:1337/api/provider/servicelogin", {
      email: email,
      password: password
    })
    .then(response => {

      if (!response.data.success) {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Invalid"
        });

      } 
      else {

        
        const data = {
          provider_id: response.data.provider.provider_id,
          provider_name: response.data.provider.provider_name,
          email: response.data.provider.email
        };

        
        sessionStorage.setItem("mydata", JSON.stringify(data));

        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          text: `Welcome ${data.provider_name}`
        }).then(() => {
          window.location="/dashboard"
        });

      }

    })
    .catch(error => {

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later"
      });

    });
  };

  return (
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Login</h4>
                </div>

                <div className="card-body">
                  <form noValidate onSubmit={handleLogin}>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Login
                      </button>
                    </div>

                  </form>
                </div>
              </div>

              <div className="mt-5 text-muted text-center">
                Don't have an account? <Link to="/register">Create One</Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
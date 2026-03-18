import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    business_name: "",
    city: "",
    address: "",
    description: "",
    id_proof: null
  });

  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState("");

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    if (e.target.name === "id_proof") {
      const file = e.target.files[0];
      setFormData({ ...formData, id_proof: file });
      setFileName(file ? file.name : "");
      setErrors({ ...errors, id_proof: "" });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    let err = {};

    if (!/^[A-Za-z ]{3,}$/.test(formData.name))
      err.name = "Enter valid name (min 3 letters)";

    if (!/^[6-9][0-9]{9}$/.test(formData.phone))
      err.phone = "Enter valid 10 digit mobile number";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      err.email = "Invalid email format";

    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(formData.password))
      err.password = "Password must contain upper, lower & number";

    if (formData.business_name.trim().length < 3)
      err.business_name = "Business name too short";

    if (!/^[A-Za-z ]{2,}$/.test(formData.city))
      err.city = "Invalid city";

    if (formData.address.trim().length < 10)
      err.address = "Address too short";

    if (formData.description.trim().length < 20)
      err.description = "Description minimum 20 characters";

    if (!formData.id_proof)
      err.id_proof = "Upload ID proof";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------- REGISTER ----------------
  const handleRegister = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    Axios.post("http://localhost:1337/api/provider/register", data)
      .then(res => {
        Swal.fire({
          title: "Registered Successfully",
          text: "Your Provider ID: " + res.data.provider_id,
          icon: "success"
        }).then(() => window.location = "/login");
      })
      .catch(err => {
        Swal.fire("Error", err.response?.data?.message || "Registration failed", "error");
      });
  };

  // ---------------- UI ----------------
  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">

        <div className="card shadow">
          <div className="card-header text-center bg-primary text-white">
            <h3>Register</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleRegister} noValidate>

              <input name="name" placeholder="Service Provider Name"
                className={`form-control mb-2 ${errors.name && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.name}</div>

              <input name="phone" placeholder="Contact Number" maxLength="10"
                className={`form-control mb-2 ${errors.phone && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.phone}</div>

              <input name="email" placeholder="Email"
                className={`form-control mb-2 ${errors.email && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.email}</div>

              <input name="password" type="password" placeholder="Password"
                className={`form-control mb-2 ${errors.password && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.password}</div>

              <input name="business_name" placeholder="Business Name"
                className={`form-control mb-2 ${errors.business_name && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.business_name}</div>

              <input name="city" placeholder="City"
                className={`form-control mb-2 ${errors.city && "is-invalid"}`}
                onChange={handleChange}/>
              <div className="invalid-feedback">{errors.city}</div>

              <textarea name="address" placeholder="Address"
                className={`form-control mb-2 ${errors.address && "is-invalid"}`}
                onChange={handleChange}></textarea>
              <div className="invalid-feedback">{errors.address}</div>

              <textarea name="description" placeholder="Description"
                className={`form-control mb-2 ${errors.description && "is-invalid"}`}
                onChange={handleChange}></textarea>
              <div className="invalid-feedback">{errors.description}</div>

              {/* ID PROOF SECTION */}
              <div className="form-group mb-3">
                <label className="fw-bold">
                  Upload ID Proof <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  name="id_proof"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className={`form-control ${errors.id_proof ? "is-invalid" : ""}`}
                  onChange={handleChange}
                />

                <small className="text-muted">
                  Accepted: Aadhaar / PAN / Driving License (JPG, PNG, PDF | Max 2MB)
                </small>

                {fileName && (
                  <div className="text-primary small mt-1">
                    Selected: {fileName}
                  </div>
                )}

                <div className="invalid-feedback">{errors.id_proof}</div>
              </div>

              <button className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>

        <div className="text-center mt-3">
          Already have account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;

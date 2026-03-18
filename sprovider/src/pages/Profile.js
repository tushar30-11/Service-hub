import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Profile() {

  const user = JSON.parse(sessionStorage.getItem("mydata"));

  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    provider_name: "",
    email: "",
    contactno: "",
    business_name: "",
    city: "",
    address: "",
    description: ""
  });

  useEffect(() => {

    if (!user) {
      window.location = "/login";
      return;
    }

    axios.post("http://localhost:1337/api/getproviderprofile", {
      provider_id: user.provider_id
    })
    .then(res => {
      setFormData(res.data);
    });

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    axios.post("http://localhost:1337/api/updateproviderprofile", {
      ...formData,
      provider_id: user.provider_id
    })
    .then(res => {

      Swal.fire("Success", "Profile Updated Successfully", "success");

      setIsEdit(false);

      sessionStorage.setItem("mydata", JSON.stringify({
        provider_id: user.provider_id,
        provider_name: formData.provider_name,
        email: formData.email
      }));

    })
    .catch(() => {
      Swal.fire("Error", "Update Failed", "error");
    });
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h4>My Profile</h4>
          </div>

          <div className="card-body">

            {!isEdit ? (

              <>
                <p><strong>Name:</strong> {formData.provider_name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Contact:</strong> {formData.contactno}</p>
                <p><strong>Business:</strong> {formData.business_name}</p>
                <p><strong>City:</strong> {formData.city}</p>
                <p><strong>Address:</strong> {formData.address}</p>
                <p><strong>Description:</strong> {formData.description}</p>

                <button 
                  className="btn btn-primary"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              </>

            ) : (

              <form onSubmit={handleUpdate}>

               <div className="row">

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Provider Name</label>
                      <input
                        type="text"
                        name="provider_name"
                        className="form-control"
                        value={formData.provider_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        readOnly
                        style={{ backgroundColor: "#e9ecef", cursor: "not-allowed" }}
                      />
                    </div>
                  </div>

                </div>

                <div className="form-group">
                  <label>Contact</label>
                  <input
                    type="text"
                    name="contactno"
                    className="form-control"
                    value={formData.contactno}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    className="form-control"
                    value={formData.business_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button className="btn btn-success mr-2">
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEdit(false)}
                >
                  Cancel
                </button>

              </form>

            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
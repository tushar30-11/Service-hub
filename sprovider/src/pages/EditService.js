import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditService() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  const provider_id = user?.provider_id;

  const [oldImage, setOldImage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const service_id = location.state?.service_id;

  const [categories, setCategories] = useState([]);

  const [service_name, setServiceName] = useState("");
  const [category_id, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [service_image, setImage] = useState(null);

  // Load categories
useEffect(() => {

  if(!provider_id) return;

  axios.get(`http://localhost:1337/api/getcategory/${provider_id}`)
    .then(res => setCategories(res.data))
    .catch(() => Swal.fire("Error","Failed to load categories","error"));

}, [provider_id]);
  // Load existing service data
  useEffect(() => {

    if (!service_id) return;

    axios.post("http://localhost:1337/api/editservice", {
      service_id: service_id
    })
    .then(res => {

      const data = res.data;

      setServiceName(data.service_name);
      setCategory(data.category_id);
      setPrice(data.price);
      setDuration(data.duration);
      setDescription(data.description);
      setOldImage(data.service_image);

    })
    .catch(() => Swal.fire("Error","Failed to load service data","error"));

  }, [service_id]);

  // Update Service
  const submitService = (e) => {
    e.preventDefault();

    if (!service_name || !category_id || !price || !duration) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("service_id", service_id);
    formData.append("provider_id", provider_id);
    formData.append("category_id", category_id);
    formData.append("service_name", service_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("duration", duration);

    if (service_image) {
      formData.append("service_image", service_image);
    }

    axios.post("http://localhost:1337/api/editserviceprocess", formData)
      .then(res => {

        if(res.data.success){

          Swal.fire("Success", res.data.message, "success")
            .then(() => {
              navigate("/view-services");
            });

        } else {
          Swal.fire("Error", res.data.message, "error");
        }

      })
      .catch(() => Swal.fire("Error", "Server Error", "error"));
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">

              <div className="card-header">
                <h4>Edit Service</h4>
              </div>

              <div className="card-body">
                <form onSubmit={submitService}>

                  <div className="form-group">
                    <label>Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={service_name}
                      onChange={(e)=>setServiceName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Service Category</label>
                    <select
                      className="form-control"
                      value={category_id}
                      onChange={(e)=>setCategory(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.category_id} value={cat.category_id}>
                          {cat.category_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Service Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={duration}
                      onChange={(e)=>setDuration(e.target.value)}
                    />
                  </div>

                  {oldImage && (
                    <div className="form-group">
                      <label>Current Image</label>
                      <div>
                        <img
                          src={`http://localhost:1337/public/services/${oldImage}`}
                          alt="service"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "10px"
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Change Image (optional)</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e)=>setImage(e.target.files[0])}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-warning">
                    Update Service
                  </button>

                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditService;
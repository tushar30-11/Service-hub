import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AddServices() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  const provider_id = user?.provider_id;

  const [categories, setCategories] = useState([]);

  const [service_name, setServiceName] = useState("");
  const [category_id, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [service_image, setImage] = useState(null);

  // Load categories from DB
  useEffect(() => {

    if(!provider_id) return;

    axios.get(`http://localhost:1337/api/getcategory/${provider_id}`)
      .then(res => setCategories(res.data))
      .catch(() => Swal.fire("Error","Failed to load categories","error"));

  }, [provider_id]);

  // Submit service
  const submitService = (e) => {
    e.preventDefault();

    if (!service_name || !category_id || !price || !duration) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("provider_id", provider_id);
    formData.append("category_id", category_id);
    formData.append("service_name", service_name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("service_image", service_image);

    axios.post("http://localhost:1337/api/addservice", formData)
      .then(res => {
        if(res.data.success){
          Swal.fire("Success", res.data.message, "success");
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
                <h4>Add New Service</h4>
              </div>

              <div className="card-body">
                <form onSubmit={submitService}>

                  {/* Service Name */}
                  <div className="form-group">
                    <label>Service Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter service name"
                      required
                      onChange={(e)=>setServiceName(e.target.value)}
                    />
                  </div>

                  {/* Category */}
                  <div className="form-group">
                    <label>Service Category</label>
                    <select 
                      className="form-control"
                      required
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

                  {/* Price */}
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter price"
                      required
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>

                  {/* Duration */}
                  <div className="form-group">
                    <label>Service Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 1 hour / 2 hours"
                      required
                      onChange={(e)=>setDuration(e.target.value)}
                    />
                  </div>

                  {/* Service Image Upload */}
                  <div className="form-group">
                    <label>Service Image</label>
                    <input
                      type="file"
                      className="form-control"
                      required
                      accept="image/*"
                      onChange={(e)=>setImage(e.target.files[0])}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Describe the service"
                      required
                      onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default AddServices;
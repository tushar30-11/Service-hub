import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditCategory() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  const location = useLocation();
  const navigate = useNavigate();

  const category_id = location.state?.category_id;

  const [categoryData, setCategoryData] = useState({
    category_id: "",
    category_name: "",
    description: ""
  });

  // Load category data
  useEffect(() => {
    if (category_id) {
      Axios.post('http://localhost:1337/api/editcategory', {
        category_id: category_id
      })
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
    }
  }, [category_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:1337/api/editcategoryprocess', categoryData)
      .then((response) => {

        Swal.fire({
          title: 'Success!',
          text: 'Category edited successfully.',
          icon: 'success'
        }).then(() => {
          navigate("/view-category");
        });

      })
      .catch((error) => {

        Swal.fire({
          title: 'Error!',
          text: 'Error editing category.',
          icon: 'error'
        });

      });
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Edit Service Category</h4>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                    <label>Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="category_name"
                      value={categoryData.category_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="description"
                      value={categoryData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button className="btn btn-primary">
                    Update
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

export default EditCategory;
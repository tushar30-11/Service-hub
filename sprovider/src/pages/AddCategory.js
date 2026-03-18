import React from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function AddCategory() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));

  if (!user) {
    window.location = "/login";
    return null;
  }

  const provider_id = user.provider_id; // ✅ IMPORTANT

  function categoryAdd() {

    const category_name = document.getElementById("category_name").value;
    const description = document.getElementById("description").value;

    if (!category_name || !description) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all required fields.",
      });
      return;
    }

    console.log("Provider ID going:", provider_id); // ✅ Debug

    Axios.post("http://localhost:1337/api/addcategoryprocess", {
      provider_id: provider_id, // ✅ SEND THIS
      category_name: category_name,
      description: description,
    })
      .then((response) => {

        if (response.data.success) {

          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
          }).then(() => {
            window.location = "/view-category";
          });

        } else {

          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.data.message,
          });

        }

      })
      .catch(() => {

        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again later.",
        });

      });
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>Add Service Category</h4>
              </div>

              <div className="card-body">

                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category_name"
                    placeholder="Enter category name"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Enter category description"
                  ></textarea>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={categoryAdd}
                >
                  Submit
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddCategory;
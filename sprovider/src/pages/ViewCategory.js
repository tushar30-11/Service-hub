import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function ViewCategory() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  const provider_id = user?.provider_id;

  const [list, setList] = useState([]);

  // 🔥 Load only provider's categories
  useEffect(() => {
    if (!provider_id) return;

    Axios.get(`http://localhost:1337/api/getcategory/${provider_id}`)
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Failed to load categories", "error");
      });

  }, [provider_id]);

  const handleDelete = (category_id) => {

    Swal.fire({
      title: 'Are you Sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (result.isConfirmed) {

        Axios.delete(`http://localhost:1337/api/category_delete/${category_id}`)
          .then(() => {

            setList(list.filter(item => item.category_id !== category_id));

            Swal.fire(
              'Deleted',
              'Category deleted successfully',
              'success'
            );

          });

      } else {

        Swal.fire(
          'Cancelled',
          'Your category is safe 🙂',
          'info'
        );

      }

    });
  };

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4>View Service Categories</h4>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {list.length > 0 ? (
                        list.map((Val, index) => (
                          <tr key={Val.category_id}>
                            <td>{index + 1}</td>
                            <td>{Val.category_name}</td>
                            <td>{Val.description}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to="/editcategory"
                                  state={{ category_id: Val.category_id }}
                                  className="btn btn-warning btn-sm mr-2"
                                >
                                  Edit
                                </Link>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(Val.category_id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Categories Found
                          </td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewCategory;
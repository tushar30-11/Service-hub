import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

function ViewServices() {

  // 🔐 SESSION CHECK
  const user = JSON.parse(sessionStorage.getItem("mydata"));
  if (!user) {
    window.location = "/login";
  }

  const provider_id = user?.provider_id;

  const [list, setList] = useState([]);

  useEffect(() => {
    if (!provider_id) return;

    axios.get(`http://localhost:1337/api/getservices/${provider_id}`)
      .then(res => {
        setList(res.data);
      })
      .catch(err => {
        console.log(err);
        Swal.fire("Error","Failed to load services","error");
      });

  }, [provider_id]);

 const handleDelete = (service_id) => {

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      axios.delete(`http://localhost:1337/api/deleteservice/${service_id}`)
        .then((response) => {

          setList(list.filter(item => item.service_id !== service_id));

          Swal.fire(
            'Deleted!',
            'Your service has been deleted.',
            'success'
          );

        });

    } 
    else if (result.dismiss === Swal.DismissReason.cancel) {

      Swal.fire(
        'Cancelled',
        'Your service is safe 🙂',
        'info'
      );

    }

  });

}

  return (
    <div className="main-content">
      <section className="section">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4>View Services</h4>
                <Link to="/add-service" className="btn btn-primary">
                  + Add New Service
                </Link>
              </div>

              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Service Name</th>
                        <th>Category</th>
                        <th>Price (₹)</th>
                        <th>Duration</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>

                      {list.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No services found
                          </td>
                        </tr>
                      ) : (
                        list.map((Val,index)=>(
                          <tr key={Val.service_id}>
                            <td>{index+1}</td>

                            <td>
                              <img
                                src={`http://localhost:1337/public/services/${Val.service_image}`}
                                alt="service"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "5px"
                                }}
                              />
                            </td>

                            <td>{Val.service_name}</td>
                            <td>{Val.category_name}</td>
                            <td>{Val.price}</td>
                            <td>{Val.duration}</td>

                            <td>
                              <Link 
                                to="/editservice" 
                                state={{ service_id: Val.service_id }} 
                                className="btn btn-warning btn-sm mr-2"
                              >
                                Edit
                              </Link>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={()=>handleDelete(Val.service_id)}
                              >
                                Delete
                              </button>
                            </td>

                          </tr>
                        ))
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

export default ViewServices;
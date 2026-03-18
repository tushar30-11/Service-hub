import React, { useEffect, useState } from "react";
import Axios from "axios";

function ViewSlider() {

  const [slider, setSlider] = useState([]);

  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/getslider")
      .then((res) => {
        setSlider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  const deleteSlider = (id) => {

    if (window.confirm("Are you sure you want to delete this slider?")) {

      Axios.post("http://127.0.0.1:1337/api/deleteslider", {
        slider_id: id
      }).then(() => {

        alert("Slider Deleted");

        setSlider(slider.filter((item) => item.slider_id !== id));

      });

    }

  };


  return (
    <div className="content-wrapper">

      <div className="row">

        <div className="col-lg-12 grid-margin stretch-card">

          <div className="card">

            <div className="card-body">

              <h4 className="card-title">View Slider</h4>

              <div className="table-responsive">

                <table className="table table-bordered">

                  <thead>

                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Text</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {slider.map((item) => (

                      <tr key={item.slider_id}>

                        <td>{item.slider_id}</td>

                        <td>
                          <img
                            src={`http://127.0.0.1:1337/public/slider/${item.slider_image}`}
                            alt=""
                            width="120"
                          />
                        </td>

                        <td>{item.slider_title}</td>

                        <td>{item.slider_text}</td>

                        <td>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteSlider(item.slider_id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewSlider;
import React, { useState } from "react";
import Axios from "axios";

function AddSlider() {

  const [slider_title, setTitle] = useState("");
  const [slider_text, setText] = useState("");
  const [slider_image, setImage] = useState(null);


  const submitSlider = (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("slider_title", slider_title);
    formData.append("slider_text", slider_text);
    formData.append("slider_image", slider_image);

    Axios.post("http://127.0.0.1:1337/api/addslider", formData)
      .then((res) => {

        alert("Slider Added Successfully");

        setTitle("");
        setText("");
        setImage(null);

      })
      .catch((err) => {
        console.log(err);
      });

  };


  return (
    <div className="content-wrapper">

      <div className="row">

        <div className="col-md-6 grid-margin stretch-card">

          <div className="card">

            <div className="card-body">

              <h4 className="card-title">Add Slider</h4>

              <form onSubmit={submitSlider}>

                <div className="form-group">

                  <label>Slider Title</label>

                  <input
                    type="text"
                    className="form-control"
                    value={slider_title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>Slider Text</label>

                  <input
                    type="text"
                    className="form-control"
                    value={slider_text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>Slider Image</label>

                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />

                </div>


                <button type="submit" className="btn btn-primary mt-3">
                  Add Slider
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddSlider;
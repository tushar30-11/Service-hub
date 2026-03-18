import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, Link } from "react-router-dom";

function Services() {

  const [catlist, setcatlist] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [tilt, setTilt] = useState({});

  const location = useLocation();
  const category_id = location.state?.category_id;

  useEffect(() => {

    const fetchServices = async () => {

      try {

        let response;

        if (category_id) {
          response = await Axios.post(
            "http://127.0.0.1:1337/api/catservices",
            { category_id: category_id }
          );
        } else {
          response = await Axios.post(
            "http://127.0.0.1:1337/api/allservices"
          );
        }

        setcatlist(response.data);
        setFilteredServices(response.data);

      } catch (error) {
        console.error("Error fetching services:", error);
      }

    };

    fetchServices();

  }, [category_id]);

  useEffect(() => {

    const result = catlist.filter((item) =>
      item.service_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredServices(result);

  }, [search, catlist]);

  // 3D Tilt Effect
  const handleMouseMove = (e, id) => {

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    setTilt({
      id,
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    });

  };

  const resetTilt = () => {
    setTilt({});
  };

  return (
    <>
      <section
        style={{
          padding: "60px 0",
          background: "#f5f7fa"
        }}
      >
        <div className="container">

          {/* TITLE */}
          <div className="row pb-30 text-center">
            <div className="col-md-12">
              <h2 style={{ color: "#222" }}>
                Our <span style={{ color: "#667eea" }}>Services</span>
              </h2>
            </div>
          </div>

          {/* SEARCH */}
          <div className="row mb-4">
            <div className="col-md-6 mx-auto">
              <input
                type="text"
                placeholder="🔍 Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: "30px",
                  border: "1px solid #ddd",
                  outline: "none",
                  background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}
              />
            </div>
          </div>

          <div className="row">

            {filteredServices.length === 0 ? (
              <p style={{ width: "100%", textAlign: "center", color: "#333" }}>
                No Services Available
              </p>
            ) : (

              filteredServices.map((val) => (

                <div className="col-md-6 col-lg-4 mb-30" key={val.service_id}>

                  {/* BORDER */}
                  <div
                    onMouseEnter={() => setHovered(val.service_id)}
                    onMouseLeave={() => {
                      setHovered(null);
                      resetTilt();
                    }}
                    onMouseMove={(e) => handleMouseMove(e, val.service_id)}

                    style={{
                      padding: "2px",
                      borderRadius: "20px",
                      background: hovered === val.service_id
                        ? "linear-gradient(135deg, #667eea, #764ba2)"
                        : "#e0e0e0",
                      transition: "0.4s"
                    }}
                  >

                    {/* GLASS CARD */}
                    <div
                      style={{
                        borderRadius: "18px",
                        padding: "15px",
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.9)",
                        transition: "all 0.4s ease",
                        transform:
                          hovered === val.service_id
                            ? `${tilt.id === val.service_id ? tilt.transform : ""} scale(1.05)`
                            : "scale(1)",
                        boxShadow:
                          hovered === val.service_id
                            ? "0 15px 35px rgba(0,0,0,0.2)"
                            : "0 5px 15px rgba(0,0,0,0.1)",
                      }}
                    >

                      {/* IMAGE */}
                      <figure style={{ overflow: "hidden", borderRadius: "12px" }}>
                        <img
                          src={`http://127.0.0.1:1337/public/services/${val.service_image}`}
                          alt={val.service_name}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            transition: "0.5s",
                            transform:
                              hovered === val.service_id ? "scale(1.1)" : "scale(1)"
                          }}
                        />
                      </figure>

                      {/* NAME */}
                      <h3 style={{ marginTop: "15px", color: "#222" }}>
                        {val.service_name}
                      </h3>

                      {/* PRICE */}
                      <p style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "#667eea"
                      }}>
                        ₹ {val.price}
                      </p>

                      {/* BUTTONS */}
                      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

                        {/* VIEW MORE */}
                        <Link
                          to={`/servicedetails/${val.service_id}`}
                          style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "10px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            color: "#fff",
                            background: "#188d9c",
                            transition: "0.3s",
                            transform: hovered === val.service_id ? "scale(1.05)" : "scale(1)",
                            boxShadow: "0 5px 15px rgba(102,126,234,0.4)"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.boxShadow = "0 10px 25px rgba(102,126,234,0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = "0 5px 15px rgba(102,126,234,0.4)";
                          }}
                        >
                          View More
                        </Link>

                        {/* BOOK */}
                        <Link
                          to="/bookservice"
                          state={{ service: val }}
                          style={{
                            flex: 1,
                            textAlign: "center",
                            padding: "10px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            color: "#fff",
                            background: "#188d9c",
                            transition: "0.3s",
                            transform: hovered === val.service_id ? "scale(1.05)" : "scale(1)",
                            boxShadow: "0 5px 15px rgba(102,126,234,0.4)"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.boxShadow = "0 10px 25px rgba(102,126,234,0.6)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = "0 5px 15px rgba(102,126,234,0.4)";
                          }}
                        >
                          Book
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>
      </section>
    </>
  );
}

export default Services;
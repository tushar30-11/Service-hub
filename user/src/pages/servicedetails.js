import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ServiceDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/editservice", {
      service_id: id
    })
      .then((res) => {
        setService(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, [id]);

  const bookService = () => {

    if (!service.service_id) {
      alert("Service not loaded yet");
      return;
    }

    navigate("/bookservice", {
  state: {
    service_id: service.service_id,
    provider_id: service.provider_id,
    title: service.service_name,
    price: service.price
  }
});

  };

  if (loading) {
    return (
      <div style={{textAlign:"center", padding:"80px"}}>
        <h3>Loading Service...</h3>
      </div>
    );
  }

  return (

<section className="padding ptb-xs-40">

<style>{`

.book-btn{
background:#4CAF0A;
color:#fff;
border:none;
padding:10px 22px;
font-size:16px;
border-radius:6px;
cursor:pointer;
transition:all 0.25s ease;
}

.book-btn:hover{
transform:translateY(-4px) scale(1.03);
box-shadow:0 8px 18px rgba(0,0,0,0.25);
}

`}</style>

<div className="container">

<div className="row justify-content-center">

<div className="col-lg-9">

<div
style={{
background:"#fff",
borderRadius:"10px",
boxShadow:"0 8px 25px rgba(0,0,0,0.1)",
overflow:"hidden"
}}
>

{/* IMAGE */}

<img
src={`http://127.0.0.1:1337/public/services/${service.service_image || "default.jpg"}`}
alt={service.service_name}
style={{
width:"100%",
height:"380px",
objectFit:"cover"
}}
/>

<div style={{padding:"30px"}}>

{/* SERVICE NAME */}

<h2 style={{marginBottom:"20px"}}>
{service.service_name}
</h2>

{/* DESCRIPTION */}

<h4
style={{
borderBottom:"2px solid #eee",
paddingBottom:"8px",
marginBottom:"15px"
}}
>
Description
</h4>

<p
style={{
color:"#555",
lineHeight:"1.8",
marginBottom:"25px"
}}
>
{service.description}
</p>

{/* SERVICE DETAILS */}

<h4
style={{
borderBottom:"2px solid #eee",
paddingBottom:"8px",
marginBottom:"15px"
}}
>
Service Details
</h4>

<ul
style={{
paddingLeft:"20px",
marginBottom:"25px",
lineHeight:"1.8"
}}
>

<li><strong>Price:</strong> ₹ {service.price}</li>
<li><strong>Duration:</strong> {service.duration}</li>
<li>Professional cleaning equipment</li>
<li>Trained service provider</li>
<li>High quality materials used</li>

</ul>

{/* BOOK BUTTON */}

<div style={{textAlign:"center"}}>

<button
className="book-btn"
onClick={bookService}
>
Book Service
</button>

</div>

</div>

</div>

</div>

</div>

</div>

</section>

  );
}

export default ServiceDetails;
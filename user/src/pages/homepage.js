import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function Homepage() {

  const [services, setServices] = useState([]);
  const [slider, setSlider] = useState([]);


  // GET SERVICES
  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/allservices")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  // GET SLIDER
  useEffect(() => {

    Axios.post("http://127.0.0.1:1337/api/getslider")
      .then((res) => {
        setSlider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);


  return (
    <>

<style>{`

.service-card{
  background:#fff;
  box-shadow:0 5px 20px rgba(0,0,0,0.08);
  border-radius:8px;
  overflow:hidden;
  transition:0.3s;
}

.service-card:hover{
  transform:translateY(-5px);
}

.service-img{
  width:100%;
  height:220px;
  object-fit:cover;
}

.service-content{
  padding:20px;
}

.service-title{
  font-size:22px;
  font-weight:700;
  margin-bottom:10px;
}

.service-desc{
  font-size:15px;
  color:#666;
}

.slide-item img{
  width:100%;
  height:600px;
  object-fit:cover;
}

.main-banner{
width:100%;
height:600px;
}

`}</style>


{/* HERO SLIDER */}

<div className="main-banner">

<Swiper
modules={[Navigation, Autoplay]}
slidesPerView={1}
navigation={true}
autoplay={{
delay:2500,
disableOnInteraction:false
}}
loop={true}
>

{slider.length > 0 ? (

slider.map((item)=>(
  
<SwiperSlide key={item.slider_id}>

<div className="slide-item">

<img
src={`http://127.0.0.1:1337/public/slider/${item.slider_image}`}
alt={item.slider_title}
/>

</div>

</SwiperSlide>

))

) : (

<>
<SwiperSlide>
<img src="/assets/images/banner/slider1.jpg" style={{width:"100%",height:"600px",objectFit:"cover"}} />
</SwiperSlide>

<SwiperSlide>
<img src="/assets/images/banner/slider2.jpg" style={{width:"100%",height:"600px",objectFit:"cover"}} />
</SwiperSlide>

<SwiperSlide>
<img src="/assets/images/banner/slider3.jpg" style={{width:"100%",height:"600px",objectFit:"cover"}} />
</SwiperSlide>
</>

)}

</Swiper>

</div>


{/* OUR SERVICES */}

<section className="padding ptb-xs-40">

<div className="container">

<div className="row text-center mb-40">
<div className="col-md-8 offset-md-2">

<h2>Our Expert Services</h2>
<p>
Reliable home services delivered by experienced professionals. 
We help you maintain a clean, safe, and comfortable living space.
</p>

</div>
</div>


<div className="row">

{services.map((service)=>(

<div className="col-lg-4 col-md-6 mb-4" key={service.service_id}>

<div className="service-card">

<img
src={`http://127.0.0.1:1337/public/services/${service.service_image}`}
className="service-img"
alt={service.service_name}
/>

<div className="service-content">

<div className="service-title">
{service.service_name}
</div>

<div className="service-desc">
{service.description}
</div>

</div>

</div>

</div>

))}

</div>

</div>

</section>

</>
  );
}

export default Homepage;


import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Header() {

  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [categories,setCategories] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("userdata"));
    setUser(storedUser);
  }, [location]);


  // GET ALL CATEGORY

  useEffect(()=>{

    axios.get("http://127.0.0.1:1337/api/getallcategory")
    .then((res)=>{

      setCategories(res.data);

    })
    .catch((err)=>{
      console.log(err);
    });

  },[]);



  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    setUser(null);
    window.location = "/";
  };

  return (
<header>


{/* MIDDLE HEADER */}

<div className="middel-part__block">
<div className="container">

<div className="row">

<div className="col-lg-4 logo col-md-12 d-flex align-items-center">

<Link to="/" style={{textDecoration:"none"}}>
<h3 style={{color:"#fff",margin:"0",fontWeight:"600"}}>
SERVICE HUB
</h3>
</Link>

<div className="navbar-header">
<button
type="button"
className="navbar-toggle hidden-lg-up"
data-toggle="collapse"
data-target="#navbar-menu"
>
<i className="fa fa-bars"></i>
</button>
</div>

</div>

<div className="col-lg-8 col-md-12">

<div className="top-info__block text-right">

<ul>

<li>
<i className="fa fa-map-marker"></i>
<p>
13005 Greenvile Avenue
<span> California, TX 70240</span>
</p>
</li>

<li>
<i className="fa fa-phone"></i>
<p>
Call Us
<span> +56 (0) 012 345 6789</span>
</p>
</li>

<li>
<i className="fa fa-envelope"></i>
<p>
Mail Us
<span>
<a href="mailto:info@gmail.com">info@gmail.com</a>
</span>
</p>
</li>

</ul>

</div>

</div>

</div>

</div>
</div>


{/* NAVBAR */}

<div
className="main_nav stricky-header__top navbar-toggleable-md"
style={
isSticky
? {
position: "fixed",
top: "0",
width: "100%",
zIndex: "9999",
background: "#4CAF0A"
}
: {}
}
>

<nav className="navbar navbar-default navbar-sticky bootsnav">

<div className="container">

<div className="collapse navbar-collapse" id="navbar-menu">

<ul className="nav navbar-nav mobile-menu d-flex justify-content-between">

<li>
<Link to="/">Home</Link>
</li>

<li>
<Link to="/about">About Us</Link>
</li>


{/* SERVICES MENU */}

<li>

<a href="/#">Services</a>
<span className="submenu-button"></span>

<ul className="dropdown-menu">

<li>
<Link to="/services">
All Category
</Link>
</li>

{categories.map((cat)=>(
<li key={cat.category_id}>
<Link to='/services' state={{category_id:cat.category_id}}>
{cat.category_name}
</Link>
</li>
))}

</ul>

</li>


<li>
<Link to="/contact">Contact Us</Link>
</li>


{/* MY BOOKINGS */}

{user && (

<li>
<Link to="/mybookings">
My Bookings
</Link>
</li>

)}



{/* MANAGE PROFILE MENU */}

{user && (

<li>
<Link to="/viewprofile">
Manage Profile
</Link>
</li>

)}



{/* LOGIN / LOGOUT */}

{user ? (

<li>
<a
href="/#"
onClick={handleLogout}
style={{cursor:"pointer"}}
>
Logout
</a>
</li>

) : (

<li>
<Link to="/login">
Login / Register
</Link>
</li>

)}

</ul>

</div>

</div>

</nav>

</div>

{isSticky && <div style={{height:"70px"}}></div>}

</header>
  );
}

export default Header;
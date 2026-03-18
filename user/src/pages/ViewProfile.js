import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ViewProfile(){

const user = JSON.parse(sessionStorage.getItem("userdata"));

if(!user){
window.location="/login";
}

const [profile,setProfile] = useState({});

useEffect(()=>{

Axios.post("http://127.0.0.1:1337/api/getuserprofile",{
user_id:user.user_id
})
.then((res)=>{

setProfile(res.data);

})
.catch((err)=>{
console.log(err);
});

},[]);

return(

<div className="container mt-5">

<div className="row justify-content-center">

<div className="col-md-6">

<div className="card p-4 shadow">

<h3 className="text-center mb-4">
My Profile
</h3>

<div className="mb-3">
<strong>Name :</strong> {profile.name}
</div>

<div className="mb-3">
<strong>Email :</strong> {profile.email}
</div>

<div className="mb-3">
<strong>Phone :</strong> {profile.phone}
</div>

<div className="mb-4">
<strong>Address :</strong> {profile.address}
</div>

<Link to="/editprofile">

<button className="btn btn-success w-100">
Edit Profile
</button>

</Link>

</div>

</div>

</div>

</div>

);

}

export default ViewProfile;
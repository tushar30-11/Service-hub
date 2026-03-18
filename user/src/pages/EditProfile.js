import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditProfile(){

const navigate = useNavigate();

const user = JSON.parse(sessionStorage.getItem("userdata"));

if(!user){
window.location="/login";
}

const [profile,setProfile] = useState({
name:"",
email:"",
phone:"",
address:""
});

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


const handleChange=(e)=>{

setProfile({
...profile,
[e.target.name]:e.target.value
});

};


const updateProfile=()=>{

if(!profile.name || !profile.phone || !profile.address){

Swal.fire("Error","All fields required","error");
return;

}

Axios.post("http://127.0.0.1:1337/api/updateuserprofile",{
...profile,
user_id:user.user_id
})
.then((res)=>{

if(res.data.status===1){

Swal.fire("Success","Profile updated","success")
.then(()=>{

navigate("/viewprofile");

});

}

})
.catch((err)=>{
console.log(err);
});

};


return(

<div className="container mt-5">

<div className="row justify-content-center">

<div className="col-md-6">

<div className="card p-4 shadow">

<h3 className="text-center mb-4">
Edit Profile
</h3>


<div className="mb-3">

<label>Name</label>

<input
type="text"
name="name"
className="form-control"
value={profile.name}
onChange={handleChange}
/>

</div>


<div className="mb-3">

<label>Email</label>

<input
type="email"
className="form-control"
value={profile.email}
readOnly
/>

</div>


<div className="mb-3">

<label>Phone</label>

<input
type="text"
name="phone"
className="form-control"
value={profile.phone}
onChange={handleChange}
/>

</div>


<div className="mb-4">

<label>Address</label>

<textarea
name="address"
className="form-control"
value={profile.address}
onChange={handleChange}
/>

</div>


<button
className="btn btn-success w-100"
onClick={updateProfile}
>
Update Profile
</button>

</div>

</div>

</div>

</div>

);

}

export default EditProfile;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ForgotPassword() {

const [email,setEmail] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e)=>{

e.preventDefault();

if(!email){
Swal.fire("Error","Email required","error");
return;
}

try{

const res = await fetch("http://127.0.0.1:1337/api/checkemail",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email})
});

const data = await res.json();

if(data.status===1){

Swal.fire("Success","Email verified","success").then(()=>{

navigate("/resetpassword",{state:{email}});

});

}else{

Swal.fire("Error","Email not found","error");

}

}catch(err){

Swal.fire("Error","Server error","error");

}

};

return(

<div className="container mt-5">

<div className="row justify-content-center">

<div className="col-md-6">

<div className="card p-4">

<h3 className="text-center mb-4">
Forgot Password
</h3>

<form onSubmit={handleSubmit}>

<input
type="email"
className="form-control"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<button className="btn btn-success w-100">
Verify Email
</button>

</form>

</div>

</div>

</div>

</div>

);

}

export default ForgotPassword;
import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ResetPassword(){

const location = useLocation();
const navigate = useNavigate();

const email = location.state?.email;

const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");

const handleSubmit = async (e)=>{

e.preventDefault();

if(!password || !confirm){
Swal.fire("Error","All fields required","error");
return;
}

if(password!==confirm){
Swal.fire("Error","Passwords do not match","error");
return;
}

try{

const res = await fetch("http://127.0.0.1:1337/api/resetpassword",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
});

const data = await res.json();

if(data.status===1){

Swal.fire("Success","Password updated","success").then(()=>{

navigate("/login");

});

}else{

Swal.fire("Error","Something went wrong","error");

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
Reset Password
</h3>

<form onSubmit={handleSubmit}>

<input
type="password"
placeholder="New Password"
className="form-control"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="Confirm Password"
className="form-control"
value={confirm}
onChange={(e)=>setConfirm(e.target.value)}
/>

<br/>

<button className="btn btn-success w-100">
Update Password
</button>

</form>

</div>

</div>

</div>

</div>

);

}

export default ResetPassword;
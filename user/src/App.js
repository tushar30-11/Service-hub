import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./pages/homepage";
import Register from "./pages/register";
import Login from "./pages/login";
import Services from "./pages/services";
import ServiceDetails from "./pages/servicedetails";
import BookService from "./pages/bookservice";
import MyBookings from "./pages/mybookings";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/servicedetails/:id" element={<ServiceDetails />} />
        <Route path="/bookservice" element={<BookService />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/viewprofile" element={<ViewProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
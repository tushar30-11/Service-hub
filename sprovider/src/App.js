import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard";
import AddServices from "./pages/AddServices";
import ViewServices from "./pages/ViewServices";
import AddCategory from "./pages/AddCategory";
import ViewCategory from "./pages/ViewCategory";
import ViewBookings from "./pages/ViewBookings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditCategory from "./pages/editcategory";
import EditService from "./pages/EditService";
import Profile from "./pages/Profile";

/* ✅ NEW IMPORTS */
import AddStaff from "./pages/AddStaff";
import ViewStaff from "./pages/ViewStaff";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/add-category"
          element={
            <Layout>
              <AddCategory />
            </Layout>
          }
        />

        <Route
          path="/view-category"
          element={
            <Layout>
              <ViewCategory />
            </Layout>
          }
        />

        {/* SERVICES */}
        <Route
          path="/add-service"
          element={
            <Layout>
              <AddServices />
            </Layout>
          }
        />

        <Route
          path="/view-services"
          element={
            <Layout>
              <ViewServices />
            </Layout>
          }
        />

        {/* ✅ STAFF ROUTES ADDED */}
        <Route
          path="/add-staff"
          element={
            <Layout>
              <AddStaff />
            </Layout>
          }
        />

        <Route
          path="/view-staff"
          element={
            <Layout>
              <ViewStaff />
            </Layout>
          }
        />

        <Route
          path="/view-bookings"
          element={
            <Layout>
              <ViewBookings />
            </Layout>
          }
        />

        <Route
          path="/editcategory"
          element={
            <Layout>
              <EditCategory />
            </Layout>
          }
        />

        <Route
          path="/editservice"
          element={
            <Layout>
              <EditService />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
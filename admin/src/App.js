import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import ViewServiceProvider from "./pages/viewserviceprovider";
import ViewServices from "./pages/ViewServices";
import ViewSlider from "./pages/viewslider";
import AddSlider from "./pages/addslider";

/* ✅ NEW IMPORTS */
import AddRole from "./pages/AddRole";
import ViewRole from "./pages/ViewRole";


// PRIVATE ROUTE (Session Based)
function PrivateRoute({ children }) {
  const admin = sessionStorage.getItem("admindata");

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// 🧩 LAYOUT WRAPPER
function Layout({ children }) {
  return (
    <div className="container-scroller">
      <Header />

      <div className="container-fluid page-body-wrapper">
        <Sidebar />

        <div className="main-panel">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />


        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* VIEW SERVICE PROVIDER */}
        <Route
          path="/viewserviceprovider"
          element={
            <PrivateRoute>
              <Layout>
                <ViewServiceProvider />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* VIEW SERVICES */}
        <Route
          path="/viewservice"
          element={
            <PrivateRoute>
              <Layout>
                <ViewServices />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* ✅ ADD ROLE */}
        <Route
          path="/add-role"
          element={
            <PrivateRoute>
              <Layout>
                <AddRole />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* ✅ VIEW ROLE */}
        <Route
          path="/view-role"
          element={
            <PrivateRoute>
              <Layout>
                <ViewRole />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* VIEW SLIDER */}
        <Route
          path="/viewslider"
          element={
            <PrivateRoute>
              <Layout>
                <ViewSlider />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* ADD SLIDER */}
        <Route
          path="/addslider"
          element={
            <PrivateRoute>
              <Layout>
                <AddSlider />
              </Layout>
            </PrivateRoute>
          }
        />


        {/* DEFAULT ROUTE */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
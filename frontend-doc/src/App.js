/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditDoctor from "./pages/admin/AdminEditDoctor";
import AdminView from "./pages/admin/AdminView";
import Appoinments from "./pages/admin/Appoinments";
import Users from "./pages/admin/Users";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import AdminRoutes from "./pages/protected_routes/AdminRoutes";
import DoctorRoutes from "./pages/protected_routes/DoctorRoutes";
import UserRoutes from "./pages/protected_routes/UserRoutes";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import AppointmentHistory from "./pages/User/AppointmentHistory";
import Childcare from "./pages/User/Childcare";
import ChildcareDetail from "./pages/User/ChildcareDetail";
import Details from "./pages/User/Details";
import EmergencyContacts from "./pages/User/EmergencyContacts";
import HealthPackage from "./pages/User/HealthPackage";
import Homepage from "./pages/User/Homepage";
import UserProfile from "./pages/User/UserProfile";
import Success from "./pages/User/Success";
import UserDashboard from "./pages/User/UserDashboard";
import ProductsPage from "./pages/admin/ProductsPage";
import Checkout from "./pages/User/Checkout";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [navbar, setNavBar] = useState(null);

  return (
    <Router>
      <ToastContainer />
      {user ? user.isAdmin === false ? <Navbar /> : null : <Navbar />}
      {/* <Navbar />{" "} */}
      {/* Move Navbar outside of Routes for it to always be visible */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<DoctorRoutes />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Route>
        <Route path="/admin/edit/:id" element={<AdminEditDoctor />} />
        <Route path="/admin/view/:id" element={<AdminView />} />
        <Route path="/admin/appointments" element={<Appoinments />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route element={<UserRoutes />}>
          <Route path="/homepage" element={<Homepage />} />
        </Route>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/success" element={<Success />} />
        <Route path="/emergency" element={<EmergencyContacts />} />
        <Route path="/childcare" element={<Childcare />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/childcare/:id" element={<ChildcareDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/healthpackages" element={<HealthPackage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<AppointmentHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

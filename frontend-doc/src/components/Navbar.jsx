/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  //Logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleAppointmentHistory =()=>{
    navigate("/history")
  }

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="fixed-top bg-white sticky">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand text-danger fw-bold" href="/">
              <img
                src="../assets/images/logo.png"
                style={{
                  width: "100px",
                  marginLeft: "0px",
                }}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link active"
                    onClick={() => handleNavigation("/healthpackages")}
                  >
                    Health Packages
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link active"
                    onClick={() => handleNavigation("/childcare")}
                  >
                    Childcare
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link active"
                    onClick={() => handleNavigation("/homepage")}
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>

            <form className="d-flex gap-2" role="search">
              {user ? (
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontSize: "1rem",
                      padding: "10px 20px"
                    }}
                  >
                    {user.UserName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/emergency">
                        Emergency Contacts
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleAppointmentHistory} className="dropdown-item">
                        Appointment History
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </>
              )}
            </form>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;

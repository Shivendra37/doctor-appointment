/* eslint-disable jsx-a11y/anchor-is-valid */
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  //Logout
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <div
        className="fixed-top d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{
          height: "100vh",
          width: "250px",
          top: 0,
          left: 0,
          overflow: "hidden",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        <a
          href="/admin"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img
            src="../assets/images/logo.png"
            alt=""
            width="150"
            height="100"
            className="img-fluid"
          />
        </a>

        <ul
          className="nav nav-pills flex-column mb-auto"
          style={{ fontWeight: "bold", marginTop: "50px" }}
        >
          <li>
            <a
              href="/admin"
              className="nav-link link-dark"
              style={{ marginBottom: "20px" }}
            >
              DOCTOR
            </a>
          </li>
          <li>
            <a
              href="/admin/appointments"
              className="nav-link link-dark"
              style={{ marginBottom: "20px" }}
            >
              APPOINTMENT
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              className="nav-link link-dark"
              style={{ marginBottom: "20px" }}
            >
              USER
            </a>
          </li>
          <li>
            <a href="/admin/products" className="nav-link link-dark">
              PACKAGES
            </a>
          </li>
        </ul>

        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "#212529", textDecoration: "none" }} // Dark text color and remove default link underline
          >
            <strong>Setting</strong>
          </a>
          <ul class="dropdown-menu">
            <li>
              <Link
                class="dropdown-item"
                to="/forgotPassword"
                style={{ color: "blue" }}
              >
                CHANGE PASSWORD
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                class="dropdown-item"
                style={{ color: "#dc3545" }}
              >
                <FontAwesomeIcon
                  icon={faSignOut}
                  style={{ marginRight: "0.5rem" }}
                />
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

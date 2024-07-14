import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBookMedical,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Navbar />
          </div>
          <section className="main-content bg-yellow" id="home">
            <div className="container">
              <div className="row min-vh-100 align-items-center text-center text-md-left">
                <div className="col-md-6 pr-md-5" data-aos="zoom-in">
                  <img
                    src="../assets/images/home1.png"
                    className="img-fluid"
                    alt=""
                    style={{
                      borderRadius: "8px",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>

                <div className="col-md-6 pl-md-5 content" data-aos="fade-left">
                  <h1>
                    <span>Quick Appointments</span>, <span>Quality Care</span>
                  </h1>
                  <h3>Just a Click Away!</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleNavigation("/homepage")}
                  >
                    Book appointment
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-light" id="about">
            <div className="container">
              <div className="row min-vh-100 align-items-center">
                <div className="col-md-6 content" data-aos="fade-right">
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="card-title">
                        <FontAwesomeIcon icon={faUserDoctor} /> Doctor's Details
                      </h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque, quis.
                      </p>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleNavigation("/homepage")}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">
                        <FontAwesomeIcon icon={faBookMedical} /> Book
                        Appointments
                      </h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque, quis.
                      </p>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleNavigation("/homepage")}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="col-md-6 d-none d-md-block"
                  data-aos="fade-left"
                >
                  <img
                    src="../assets/images/cont.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="contact bg-light" id="contact">
            <div className="container">
              <div className="row min-vh-100 align-items-center">
                <div className="col-md-6 content" data-aos="fade-right">
                  <div className="contact-details">
                    <div className="email">
                      <h3>Email:</h3>
                      <p>bookDoc12@gmail.com</p>
                    </div>

                    <div className="phone">
                      <h3>Contact:</h3>
                      <p>+977 982772996</p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6 d-none d-md-block"
                  data-aos="fade-left"
                >
                  <img
                    src="../assets/images/detail.png"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="footer bg-dark text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <p>
                    bookDoc website is a vital online platform, offering
                    medical information, appointment scheduling, to enhance
                    health literacy, communication between patients and
                    healthcare providers, and overall patient-centered wellness.
                  </p>
                </div>

                <div
                  className="col-md-4 text-center aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h3 className="me-3">Links</h3>
                  <div className="row">
                    <a href="/" className="text-decoration-none text-white">
                      Home
                    </a>

                    <a href="#about" className="text-decoration-none text-white">
                      About
                    </a>

                    <a
                      href="#health packages"
                      className="text-decoration-none text-white"
                    >
                      Health Packages
                    </a>

                    <a
                      href="#childcare"
                      className="text-decoration-none text-white"
                    >
                      Childcare
                    </a>

                    <a href="#contact" className="text-decoration-none text-white">
                      Contact
                    </a>
                  </div>
                </div>

                <div
                  className="col-md-4 text-center aos-init aos-animate"
                  data-aos="fade-left"
                >
                  <h3>Share</h3>
                  <div className="row">
                    <a
                      href="https://www.facebook.com"
                      className="text-decoration-none text-white"
                    >
                      <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                    <a
                      href="https://www.instagram.com"
                      className="text-decoration-none text-white"
                    >
                      <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </a>
                    <a
                      href="https://www.github.com/"
                      className="text-decoration-none text-white"
                    >
                      <FontAwesomeIcon icon={faGithub} /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="credit text-center mx-auto">
              Created by <span>bookDoc</span>
            </h1>
          </section>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

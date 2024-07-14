import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";

const Register = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeconfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };

  // Validation functions
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //^ for string [^\s@]+@[^\s@] for @ and [^\s@] for .com
  const isValidPhoneNumber = (number) => /^\d{10}$/.test(number);
  const isValidPassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    if (!isValidPassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      UserName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <>
      <section class="row min-vh-100 align-items-center">
        <div class="container py-5 d-flex justify-content-center">
          <div class="col col-md-10 col-sm-12 col-lg-8 fixed-container">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    src="https://i.pinimg.com/564x/a7/dd/af/a7ddaf4475ec3822a9b8aebb2956e253.jpg"
                    alt="register image"
                    class="img-fluid"
                    style={{ marginTop: "100px" }}
                  />
                </div>
                <div>
                  <a
                    className="position-absolute top-0 end-0 m-2 text-black"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </a>
                </div>

                <div className="col-md-6 col-lg-6 order-lg-3 d-flex align-items-center">
                  <div className="card-body p-5 p-lg-5 text-black">
                    <form>
                      <div class="mb-4 d-flex justify-content-center">
                        <i class="fas fa-cubes fa-2x me-2"></i>
                      </div>

                      <h3 class="fw-bold d-flex justify-content-center">
                        Register
                      </h3>

                      {/* Username */}
                      <div class="form-outline mb-2">
                        <label class="form-label">Full Name</label>
                        <input
                          onChange={changeUserName}
                          type="text"
                          class="form-control form-control-lg border-2 border-black"
                        />
                      </div>
                      {/* Email */}
                      <div class="form-outline mb-2">
                        <label class="form-label">Email address</label>
                        <input
                          onChange={changeEmail}
                          type="email"
                          class="form-control form-control-lg border-2 border-black"
                        />
                      </div>
                      {/* Phone Number */}
                      <div class="form-outline mb-2">
                        <label class="form-label">Phone Number</label>
                        <input
                          onChange={changePhoneNumber}
                          type="number"
                          class="form-control form-control-lg border-2 border-black"
                        />
                      </div>

                      {/* Password */}
                      <div class="form-outline mb-2">
                        <label class="form-label ">Password</label>
                        <input
                          onChange={changePassword}
                          type="password"
                          class="form-control form-control-lg border-2 border-black w-full"
                        />
                      </div>
                      {/* Confirm Password */}
                      <div class="form-outline mb-2">
                        <label class="form-label">Confirm Password</label>
                        <input
                          onChange={changeconfirmPassword}
                          type="password"
                          class="form-control form-control-lg border-2 border-black"
                        />
                      </div>

                      {/* Register button */}
                      <div class="pt-1 mb-3 d-flex text-center justify-content-center">
                        <button
                          onClick={handleSubmit}
                          className="btn w-50 mb-2 btn btn-dark"
                          type="button"
                        >
                          Register
                        </button>
                      </div>

                      <p class="mb-5 pb-lg-2 d-flex justify-content-center">
                        Already have an account?{" "}
                        <a
                          href="/login"
                          class="text-decoration-none text-black"
                        >
                          Login
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;

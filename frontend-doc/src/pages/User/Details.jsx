/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { bookappointmentApi, getSingleDoctorApi } from "../../apis/Api";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const [isScanned, setIsScanned] = useState(true);

  // const simulateScan = () => {
  //   setIsScanned(true);
  // };

  const [userData, setUserData] = useState();
  const getUserDataFromLocalStorage = () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        return null;
      }

      const parsedUserData = JSON.parse(userData);

      return parsedUserData;
    } catch (error) {
      console.error("Error retrieving user data from local storage:", error);
      return null;
    }
  };
  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    setUserData(userData);
  }, []);
  //UseEffect

  //Make UseState
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMesssage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    getSingleDoctorApi(id).then((res) => {
      setFullName(res.data.doctor.fullName);
      setEmail(res.data.doctor.email);
      setPhoneNumber(res.data.doctor.phoneNumber);
      setQualification(res.data.doctor.qualification);
      setServicesOffered(res.data.doctor.servicesOffered);
      setOldImage(res.data.doctor.uploadValidIdUrl);
    });
  }, [id]);

  const handleMessageChange = (e) => {
    const emailValue = e.target.value;
    setMesssage(emailValue);
  };

  const data = {
    userId: userData,
    doctorId: id,
    message: message,
    date: date,
    time: time,
  };

  const verifyPayment = () => {
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    bookappointmentApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigate("/success");
          window.location.reload();
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
          <div class="col col-md-10 col-sm-12 col-lg-6">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    className="img-fluid rounded-4 object-fit-cover mb-3"
                    height={300}
                    width={300}
                    src={oldImage}
                    alt={fullName}
                    style={{ marginTop: 40, marginLeft: 40 }}
                  />
                </div>

                <div>
                  <a
                    className="position-absolute top-0 end-0 m-2 text-black"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/homepage")}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </a>
                </div>
                <div class="col-md-6 col-lg-6 order-lg-3 d-flex align-items-center">
                  <div class="card-body p-5 p-lg-5 text-black">
                    <form>
                      <div class="mb-2 d-flex justify-content-center">
                        <i class="fas fa-cubes fa-2x me-2"></i>
                      </div>
                      <h3 style={{ color: "blue", whiteSpace: "nowrap" }}>
                        Dr. {fullName}
                      </h3>
                      <h4 style={{ color: "green" }}>{qualification}</h4>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Email:</strong> {email}
                          <br />
                          <strong>Phone Number:</strong> {phoneNumber}
                          <br />
                          <strong>Qualification:</strong> {qualification}
                          <br />
                          <strong>Services Offered:</strong> {servicesOffered}
                        </p>
                      </div>
                    </form>
                    <div class="pt-1 mb-3 d-flex text-center justify-content-center">
                      <button
                        type="button"
                        className="btn w-30 btn btn-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Book Appointment
                      </button>
                    </div>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5">
                              Book an appointment with Dr.{fullName}!
                            </h1>
                          </div>
                          <h15
                            style={{
                              color: "blue",
                              marginTop: "10px",
                              marginLeft: "15px",
                            }}
                          >
                            Doctor's Charge: Rs. 500
                            <span style={{ color: "red" }}></span>
                          </h15>

                          <div className="modal-body">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Select Date:
                                    </label>
                                    <div>
                                      <input
                                        type="date"
                                        placeholder="Select date"
                                        value={date}
                                        onChange={(e) =>
                                          setDate(e.target.value)
                                        }
                                        min={
                                          new Date().toISOString().split("T")[0]
                                        }
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Select Time:
                                    </label>
                                    <div>
                                      <input
                                        type="time"
                                        placeholder="Select time"
                                        value={time}
                                        onChange={(e) =>
                                          setTime(e.target.value)
                                        }
                                        className="form-control"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12">
                                  <label>Message</label>
                                  <input
                                    onChange={handleMessageChange}
                                    className="form-control mb-2"
                                    type="text"
                                    name="message"
                                    value={message}
                                    id="message"
                                    placeholder=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center my-4">
                            <div className="qr-code-container">
                              {/* <img
                                src="/assets/images/esewa.jpg"
                                alt="QR Code"
                                onClick={simulateScan}
                              /> */}
                            </div>
                            {/* <p>Scan to pay</p> */}
                            <button
                              className="btn btn-dark"
                              onClick={verifyPayment}
                              // disabled={!isScanned}
                            >
                              Verify Payment
                            </button>
                          </div>

                          <div className="modal-footer">
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                </div>

                                <div className="col">
                                  <div className="pt-1 mb-3 d-flex text-center justify-content-center">
                                    <button
                                      onClick={handleSubmit}
                                      className="btn w-100 mb-2 btn btn-primary"
                                      type="button"
                                      disabled={!isVerified}
                                    >
                                      Book Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Details;

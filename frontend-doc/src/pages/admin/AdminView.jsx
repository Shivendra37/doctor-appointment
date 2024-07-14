/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleDoctorApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AdminView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //UseEffect
  useEffect(() => {
    getSingleDoctorApi(id).then((res) => {
      console.log(res.data);
      setFullName(res.data.doctor.fullName);
      setEmail(res.data.doctor.email);
      setPhoneNumber(res.data.doctor.phoneNumber);
      setGender(res.data.doctor.gender);
      setAddress(res.data.doctor.address);
      setCity(res.data.doctor.city);
      setState(res.data.doctor.state);
      setQualification(res.data.doctor.qualification);
      setServicesOffered(res.data.doctor.servicesOffered);
      setOldImage(res.data.doctor.uploadValidIdUrl);
    });
  }, [id]);

  //Make UseState
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [qualification, setQualification] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [oldImage, setOldImage] = useState("");

  return (
    <>
      <section class="row min-vh-100 align-items-center">
        <div class="container py-5 d-flex justify-content-center">
          <div class="col col-md-10 col-sm-12 col-lg-7">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    className="img-fluid rounded-4 object-fit-cover mb-3"
                    height={300}
                    width={300}
                    src={oldImage}
                    alt={fullName}
                    style={{ marginTop: 50, marginLeft: 70 }}
                  />
                </div>

                <div>
                  <a
                    className="position-absolute top-0 end-0 m-2 text-black"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/admin")}
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
                          <strong>Email: </strong> {email}
                          <br />
                          <strong>Phone Number: </strong> {phoneNumber}
                          <br />
                          <strong>Gender: </strong> {gender}
                          <br />
                          <strong>Address: </strong>
                          {address}
                          <br />
                          <strong> City: </strong>
                          {city}
                          <br />
                          <strong>State: </strong>
                          {state}
                          <br />
                          <strong>Specialization:</strong> {qualification}
                          <br />
                          <strong>Services Offered:</strong> {servicesOffered}
                        </p>
                      </div>
                    </form>

                    <div class="pt-1 mb-4 d-flex text-center justify-content-center">
                      <button
                        type="button"
                        className="btn w-50 mb-2 btn btn-dark"
                        onClick={() => navigate("/admin")}
                      >
                        Back
                      </button>
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

export default AdminView;

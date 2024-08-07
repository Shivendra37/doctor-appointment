/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  faEdit,
  faEye,
  faSearch,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createDoctorApi,
  deleteDoctorApi,
  getPaginationApi,
} from "../../apis/Api";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  //search query
  const [searchQuery, setSearchQuery] = useState("");
  //filter
  const filteredDoctors = doctors.filter((person) =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  //get user
  const user = JSON.parse(localStorage.getItem("user"));
  //Make UseState
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [qualification, setQualification] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");

  //Make UseState for image
  const [uploadValidId, setValidId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  //Image Upload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setValidId(file);
    setPreviewId(URL.createObjectURL(file));
  };
  useEffect(() => {
    getPaginationApi(currentPage).then((res) => {
      setDoctors(res.data.doctors);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  //Email validation
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  const validateEmail = (email) => {
    // Simple regex for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailValidationMessage("Invalid email format.");
    } else {
      setEmailValidationMessage(""); // Clear message when valid
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    validateEmail(emailValue);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };
  //Phone number validation

  const [validationMessage, setValidationMessage] = useState("");

  const validatePhoneNumber = (number) => {
    const regex = /^\d{10}$/; // Adjust regex according to your needs
    if (!regex.test(number)) {
      setValidationMessage("Invalid phone number. Must be 10 digits."); // Customize the message
    } else {
      setValidationMessage(""); // Clear message when valid
    }
  };

  const handlePhoneNumberChange = (e) => {
    const number = e.target.value;
    setPhoneNumber(number);
    validatePhoneNumber(number);
  };

  //Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);

    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("qualification", qualification);
    formData.append("servicesOffered", servicesOffered);
    formData.append("uploadValidId", uploadValidId);
    formData.append("user", user);
    console.log(formData);

    createDoctorApi(formData)
      .then((res) => {
        if (res.data.success == false) {  
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  //Delete
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete doctor's information?"
    );
    if (!confirm) {
      return;
    } else {
      deleteDoctorApi(id).then((res) => {
        if (res.data.success == false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2">
            <Sidebar />
          </div>

          {/* Content */}
          <div className="col-md-9 col-lg-10">
            <div className="row">
              <div className="col">
                <h1 style={{ marginTop: 20 }}>Welcome Admin</h1>
                <h3 style={{ marginTop: 20 }}>Doctor</h3>
                <p>Manage the list of doctors.</p>

                {/* Search bar */}

                <div className="d-flex justify-content-center">
                  <div
                    className="input-group mb-3 mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search by Name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn w-20 mb-2 btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Doctors
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Add new doctor!
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <label>FullName</label>
                        <input
                          onChange={(e) => setFullName(e.target.value)}
                          className="form-control mb-2"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                        />

                        <label>Email</label>
                        <input
                          onChange={handleEmailChange}
                          className="form-control mb-2"
                          type="email"
                          name="email"
                          id="email"
                          placeholder=""
                        />
                        {emailValidationMessage && (
                          <div className="text-danger">
                            {emailValidationMessage}
                          </div>
                        )}
                        <label>Password</label>
                        <input
                          onChange={handlePasswordChange}
                          className="form-control mb-2"
                          type="password"
                          name="password"
                          id="password"
                          placeholder=""
                        />

                        <label>Phone Number</label>
                        <input
                          onChange={handlePhoneNumberChange}
                          className="form-control mb-2"
                          type="number"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder=""
                        />
                        {validationMessage && (
                          <div className="text-danger">{validationMessage}</div>
                        )}

                        <label>Gender</label>
                        <select
                          onChange={(e) => setGender(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Select"
                        >
                          <option value="------Select------"></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                        <label>Address</label>
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control mb-2"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                        />

                        <label>City</label>
                        <input
                          onChange={(e) => setCity(e.target.value)}
                          className="form-control mb-2"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                        />

                        <label>Province</label>
                        <select
                          onChange={(e) => setState(e.target.value)}
                          className="form-control mb-2"
                          placeholder="Select"
                        >
                          <option value="------Select------"></option>
                          <option value="Province 1">Province 1</option>
                          <option value="Province 2">Province 2</option>
                          <option value="Bagmati Province">
                            Bagmati Province
                          </option>
                          <option value="Gandaki Province">
                            Gandaki Province
                          </option>
                          <option value="Lumbini Province">
                            Lumbini Province
                          </option>
                          <option value="Karnali Province">
                            Karnali Province
                          </option>
                          <option value="Sudurpashchim Province">
                            Sudurpashchim Province
                          </option>
                        </select>

                        <label>Qualification/Specialization</label>
                        <input
                          onChange={(e) => setQualification(e.target.value)}
                          className="form-control mb-2"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                        />

                        <label>Services Offered</label>
                        <textarea
                          onChange={(e) => setServicesOffered(e.target.value)}
                          className="form-control mb-2"
                          type="text"
                          name=""
                          id=""
                          placeholder=""
                        />

                        <label>Profile Picture</label>
                        <input
                          onChange={handleImageUpload}
                          className="form-control mb-2"
                          type="file"
                          name=""
                          id=""
                          placeholder="Enter Full Name"
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <table className="table mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Gender</th>
                      <th>Address</th>
                      <th>Qualification</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((person, index) => (
                      <tr key={person._id}>
                        <td>{index + 1}</td>
                        <td>{person.fullName}</td>
                        <td>{person.email}</td>
                        <td>{person.phoneNumber}</td>
                        <td>{person.gender}</td>
                        <td>{person.address}</td>
                        <td>{person.qualification}</td>

                        <td>
                          <div className="d-flex">
                            <Link
                              to={`/admin/view/${person._id}`}
                              className="btn btn me-2"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Link>
                            <Link
                              to={`/admin/edit/${person._id}`}
                              className="btn btn me-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <button
                              onClick={() => handleDelete(person._id)}
                              className="btn btn"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage <= 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link btn-dark"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous"
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${
                        currentPage >= totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link btn-dark"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next"
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

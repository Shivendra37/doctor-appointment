import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleDoctorApi, updateDoctorApi } from "../../apis/Api";
import { toast } from "react-toastify";
const AdminEditDoctor = () => {
  //Receive doctor id from URL
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
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

  //handle submit function
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("qualification", qualification);
    formData.append("servicesOffered", servicesOffered);
    formData.append("uploadValidId", uploadValidId);
    formData.append("user", user);

    //make a api call
    updateDoctorApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server Error!");
      });
  };

  return (
    <>
      <section class="vh-100 ">
        <div class="container py-5 d-flex justify-content-center">
          <div className="col col-md-10 col-sm-12 col-lg-7">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="col-md-6 col-lg-9 d-flex align-items-center">
                <div class="card-body p-8 p-lg-5 text-black">
                  <form>
                    <div class=" mb-9 pb-10 ">
                      <i class="fas fa-cubes fa-2x me-2 d-flex justify-content-center"></i>
                    </div>

                    <div>
                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          className="rounded-circle overflow-hidden"
                          style={{ width: "200px", height: "200px" }}
                        >
                          <img
                            className="img-fluid object-fit-cover"
                            width={200}
                            height={200}
                            src={oldImage}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <h3
                      class="fw-bold d-flex justify-content-center"
                      style={{ whiteSpace: "nowrap", margin: "10 10px" }}
                    >
                      Editing Details of Dr.{fullName}
                    </h3>

                    <div className="modal-body">
                      <form action="">
                        {/* //1st row */}
                        <div className="row">
                          <div className="col">
                            <label>FullName</label>
                            <input
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="form-control mb-2"
                              type="text"
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="col">
                            <label>Email</label>
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control mb-2"
                              type="email"
                              style={{ width: "200px" }}
                            />
                          </div>
                        </div>
                        {/* //2st row */}
                        <div className="row">
                          <div className="col">
                            <label>Phone Number</label>
                            <input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="form-control mb-2"
                              type="number"
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="col">
                            <label>Gender</label>
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="form-control mb-2"
                              style={{ width: "200px" }}
                            >
                              <option value="Choose"></option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                        </div>
                        {/* //3st row */}
                        <div className="row">
                          <div className="col">
                            <label>Address</label>
                            <input
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="form-control mb-2"
                              type="text"
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="col">
                            <label>City</label>
                            <input
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="form-control mb-2"
                              type="text"
                              style={{ width: "200px" }}
                            />
                          </div>
                        </div>
                        {/* //4st row */}
                        <div className="row">
                          <div className="col">
                            <label>State</label>
                            <input
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                              className="form-control mb-2"
                              type="text"
                              style={{ width: "200px" }}
                            />
                          </div>
                          <div className="col">
                            <label>Qualification/Specialization</label>
                            <input
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)}
                              className="form-control mb-2"
                              type="text"
                              style={{ width: "200px" }}
                            />
                          </div>

                          <div className="col">
                            <label>Services Offered</label>
                            <input
                              value={servicesOffered}
                              onChange={(e) =>
                                setServicesOffered(e.target.value)
                              }
                              className="form-control mb-2"
                              type="text"
                              name=""
                              id=""
                              placeholder="Enter services offered"
                              style={{ width: "490px", height: "100px" }}
                            />
                          </div>
                        </div>
                        <label>Upload Your Profile Picture</label>
                        <input
                          onChange={handleImageUpload}
                          className="form-control"
                          type="file"
                          style={{ width: "490px" }}
                        />
                        <h6 className="mt-4">New Image</h6>
                        {previewId ? (
                          <img
                            src={previewId}
                            alt="doctor Image"
                            className="img-fluid rounded-4 object-fit-cover"
                            width={200}
                            height={200}
                          />
                        ) : (
                          <p>No Image Selected</p>
                        )}

                        <div className="pt-1 mb-4 d-flex justify-content-center">
                          <div className="row w-100">
                            <div className="col-md-5 mb-2">
                              <button
                                onClick={handleSubmit}
                                className="btn w-100 btn-dark"
                              >
                                Update Doctor
                              </button>
                            </div>
                            <div className="col-md-4 mb-2">
                              <button
                                type="button"
                                className="btn w-100 btn-dark"
                                style={{ marginLeft: "100px" }}
                                onClick={() => navigate("/admin")}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminEditDoctor;

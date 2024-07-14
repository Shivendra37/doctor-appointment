import React, { useEffect, useState } from "react";
import { getAllDoctorsApi } from "../../apis/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";

const EmergencyContacts = () => {
  const [doctors, setDoctors] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  //filter
  const filteredDoctors = doctors.filter((person) =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getAllDoctorsApi().then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <div className="col-md-1 col-lg-1">
            <Navbar />
          </div>
          <div className="col-md-9 col-lg-10">
            <div className="row">
              <div className="col">
                <h3 style={{ marginTop: 100 }}>Doctors</h3>
                <p>Contacts of Doctors.</p>
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
              </div>
              <div className="table-box shadow-lg p-3 mb-5 bg-white rounded">
                <table className="table ">
                  <thead className="table">
                    <tr>
                      <th>SN</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((doctor, index) => (
                      <tr key={doctors._id}>
                        <td>{index + 1}</td>

                        <td>Dr. {doctor.fullName}</td>
                        <td>{doctor.phoneNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyContacts;

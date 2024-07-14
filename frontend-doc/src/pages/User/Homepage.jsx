import React, { useState, useEffect } from "react";
import { getAllDoctorsApi } from "../../apis/Api";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllDoctorsApi().then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  const filteredDoctors = doctors.filter((person) =>
    person.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <div className="col-md-3 col-lg-2">
            <Navbar />
          </div>

          <div className="d-flex justify-content-center">
            <div
              className="input-group mb-3 mx-auto"
              style={{ marginTop: 100, maxWidth: "700px" }}
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
          <h3 className="text-center">FIND YOUR DOCTOR</h3>
          <div className="row">
            <div className="container">
              <div className="row g-3">
                {filteredDoctors.map((person, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card">
                      <img
                        src={person.uploadValidIdUrl}
                        height={300}
                        width={300}
                        alt={person.fullName}
                        className="mx-auto d-block"
                        style={{ marginTop: 10 }}
                      />
                      <div className="card-body" style={{ marginLeft: 20 }}>
                        <h5 className="card-title">{person.fullName}</h5>
                        <p className="card-text">
                          {person.qualification}
                          <br />
                          {person.servicesOffered}
                        </p>
                        <Link
                          to={`/details/${person._id}`}
                          className="btn btn-primary"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

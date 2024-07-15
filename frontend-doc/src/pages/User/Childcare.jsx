// src/pages/User/Childcare.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Childcare = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/childcare/${id}`);
  };

  return (
    <div className="container">
      <h1 style={{ paddingTop: "100px" }}>Childcare Information</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img
              src="../assets/images/childcare1.png"
              className="card-img-top"
              alt="Childcare Service 1"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Child Nutrients</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleViewDetails(1)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="../assets/images/childcare2.jpg"
              className="card-img-top"
              alt="Childcare Service 2"
              style={{ height: "477px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Child growth and development monitoring</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleViewDetails(2)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <img
              src="../assets/images/childcare3.jpg"
              className="card-img-top"
              alt="Childcare Service 3"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Child Vaccine</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleViewDetails(3)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Childcare;

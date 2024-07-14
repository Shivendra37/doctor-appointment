// src/pages/User/ChildcareDetail.js
import React from "react";
import { useParams } from "react-router-dom";

const ChildcareDetail = () => {
  const { id } = useParams();

  const services = {
    1: {
      title: "Child Nutrients",
      description: "Ensuring proper nutrition for children is essential for their growth, development, and overall well-being. A balanced diet rich in essential vitamins, minerals, and nutrients lays the foundation for a healthy life. Key nutrients such as protein, calcium, iron, and vitamins A, C, and D support physical growth, cognitive development, and immune function. Encouraging a diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products helps children develop healthy eating habits that can last a lifetime. Prioritizing children's nutrition not only enhances their immediate health but also sets the stage for a thriving, vibrant future..",
      image: "../assets/images/childcare1.png",
    },
    2: {
      title: "Service 2",
      description: "Detailed information about childcare service 2.",
      image: "../assets/images/childcare2.jpg",
    },
    3: {
      title: "Child Vaccine",
      description: "Detailed information about childcare service 3.",
      image: "../assets/images/childcare3.jpg",
    },
  };

  const service = services[id];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container">
      <h1 style={{ paddingTop: "100px" }}>{service.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={service.image}
            alt={service.title}
            className="img-fluid"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
        <div className="d-flex align-items-center h-100">
        <p>{service.description}</p>
        </div>
       
        </div>
      </div>
    </div>
  );
};

export default ChildcareDetail;

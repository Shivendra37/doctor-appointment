import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChildcareDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const services = {
    1: {
      title: "Child Nutrients",
      description: "Ensuring proper nutrition for children is essential for their growth, development, and overall well-being. A balanced diet rich in essential vitamins, minerals, and nutrients lays the foundation for a healthy life. Key nutrients such as protein, calcium, iron, and vitamins A, C, and D support physical growth, cognitive development, and immune function. Encouraging a diet that includes a variety of fruits, vegetables, whole grains, lean proteins, and dairy products helps children develop healthy eating habits that can last a lifetime. Prioritizing children's nutrition not only enhances their immediate health but also sets the stage for a thriving, vibrant future..",
      image: "../assets/images/childcare1.png",
    },
    2: {
      title: "Child growth and development monitoring",
      description: "Growth and development monitoring is a critical aspect of child healthcare, focusing on the systematic assessment of a child's physical, cognitive, and emotional progress. Regular check-ups with healthcare providers allow for the early detection of developmental delays or abnormalities, enabling timely intervention and support. These assessments typically include tracking height, weight, and head circumference, as well as evaluating developmental milestones such as language acquisition, motor skills, and social behaviors. By closely monitoring these parameters, healthcare professionals can provide personalized guidance to parents, ensuring children receive the necessary resources and interventions to thrive. Ultimately, growth and development monitoring plays a pivotal role in promoting optimal health outcomes and fostering a foundation for lifelong well-being..",
      image: "../assets/images/childcare2.jpg",
    },
    3: {
      title: "Child Vaccine",
      description: "Immunizations are a cornerstone of preventive healthcare, crucial in protecting children from a variety of infectious diseases. Vaccines stimulate the immune system to recognize and combat pathogens, significantly reducing the incidence of illnesses such as measles, polio, and whooping cough. By adhering to recommended vaccination schedules, parents can ensure their children build immunity at the appropriate ages, safeguarding both individual and public health. Immunizations not only prevent serious health complications but also contribute to the eradication of diseases, as seen with smallpox. Moreover, widespread vaccination reduces the spread of contagious diseases, protecting vulnerable populations such as infants, the elderly, and those with compromised immune systems..",
      image: "../assets/images/childcare3.jpg",
    },
  };

  const service = services[id];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container">
      <button
        className="btn btn-dark"
        style={{ position: "absolute", top: "20px", left: "20px" }}
        onClick={() => navigate("/childcare")}
      >
        Back
      </button>
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

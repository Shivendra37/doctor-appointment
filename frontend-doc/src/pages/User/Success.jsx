/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <>
      <section class="row min-vh-100 align-items-center">
        <div class="container py-5 d-flex justify-content-center">
          <div class="col col-md-10 col-sm-12 col-lg-6">
            <div class="card d-flex align-items-center shadow-lg">
              <div class="row">
                <div class="col-md-6 col-lg-6 order-md-1 order-lg-1 mb-4">
                  <img
                    src="https://i.pinimg.com/564x/5f/50/ec/5f50ecb76a6772969556d16a62c1fe5e.jpg"
                    alt="success image"
                    class="img-fluid"
                    style={{ marginTop: 20 }}
                  />
                </div>

                <div className="col-md-6 col-lg-6 order-lg-3 d-flex align-items-center">
                  <div className="card-body p-5 p-lg-5 text-black">
                    <form className="d-flex flex-column align-items-start">
                      <div className="mb-4 d-flex justify-content-center">
                        <i className="fas fa-cubes fa-2x me-2"></i>
                      </div>
                      <h4 style={{ color: "green" }}>Success</h4>
                      <strong>Appointment booking Successful!!</strong>
                      <p className="text-center mb-4">
                        <strong>Mark your calendar and see you soon!</strong>
                      </p>
                      <button
                        className="btn w-70 mb-5 btn btn-dark"
                        onClick={() => navigate("/")}
                      >
                        Go back to Home
                      </button>
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

export default Success;

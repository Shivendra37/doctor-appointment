import React, { useEffect, useState } from "react";
import {
  doctorAppointmentApi,
  getAllUsersApi,
  getPaginationAppointmentApi
} from "../../apis/Api";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  // const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Fetch appointments
  useEffect(() => {
    getPaginationAppointmentApi(currentPage).then((res) => {
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetch doctors
  useEffect(() => {
    // getAllDoctorsApi().then((res) => {
    //   setDoctors(res.data.doctors);
    // });
    doctorAppointmentApi().then((res) => {
      // console.log("This is form here", res.data);
      const doctor = JSON.parse(localStorage.getItem("user"));
      const filteredAppointments = res.data.appointments.filter(
        (appointment) => appointment.doctorId === doctor._id
      );
      console.log(filteredAppointments);
      setAppointments(filteredAppointments);
    });
  }, []);

  console.log("I am from here", appointments);

  // Fetch users
  useEffect(() => {
    getAllUsersApi().then((res) => {
      setUsers(res.data.users);
    });
  }, []);


  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-12 col-lg-12">
            <div className="row">
              <div className="col">
                <h3 style={{ marginTop: 20 }}>Appointments</h3>
                <div className="d-flex justify-content-center">
                  {/* <div
                    className="input-group mb-3 mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search by Name"
                      onChange={handleSearchChange}
                      className="form-control"
                    />
                  </div> */}
                </div>
              </div>

              <table className="table mt-2">
                <thead className="table-dark">
                  <tr>
                    <th>SN</th>
                    <th>User's Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Message</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      {/* Assuming user and doctor IDs are present in the appointment */}

                      <td>
                        {
                          users.find((user) => user._id === appointment.userId)
                            ?.UserName
                        }
                      </td>

                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>{appointment.message}</td>
                      {/* <td>
                        <div className="d-flex">
                          <button
                            onClick={() => handleDelete(appointment._id)}
                            className="btn btn"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      </td> */}
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
                          className="page-link btn-dark"
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
          <div></div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;

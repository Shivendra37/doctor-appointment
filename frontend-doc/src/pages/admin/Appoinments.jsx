import React, { useEffect, useState } from "react";
import {
  deleteAppointmentApi,
  getAllDoctorsApi,
  getAllUsersApi,
  getAppointments,
  getPaginationAppointmentApi,
} from "../../apis/Api";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // Fetch appointments
  useEffect(() => {
    getPaginationAppointmentApi(currentPage).then((res) => {
      setAppointments(res.data.appointments);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Fetch doctors
  useEffect(() => {
    getAllDoctorsApi().then((res) => {
      setDoctors(res.data.doctors);
    });
  }, []);

  // Fetch users
  useEffect(() => {
    getAllUsersApi().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      searchQuery === "" ||
      users
        .find((user) => user._id === appointment.userId)
        ?.UserName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      doctors
        .find((doctor) => doctor._id === appointment.doctorId)
        ?.fullName.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );
  const handleDelete = (id) => {
    //confirm dialog box
    const confirm = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirm) {
      return;
    } else {
      deleteAppointmentApi(id).then((res) => {
        if (res.data.success === false) {
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
          <div className="col-md-9 col-lg-10">
            <div className="row">
              <div className="col">
                <h3 style={{ marginTop: 20 }}>Appointments</h3>
                <p>Manage the list of appointments.</p>
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
                      onChange={handleSearchChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <table className="table mt-2">
                <thead className="table-dark">
                  <tr>
                    <th>SN</th>
                    <th>User's Name</th>
                    <th>Doctor's Name</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      {/* Assuming user and doctor IDs are present in the appointment */}

                      <td>
                        {
                          users.find((user) => user._id === appointment.userId)
                            ?.UserName
                        }
                      </td>
                      <td>
                        {
                          doctors.find(
                            (doctor) => doctor._id === appointment.doctorId
                          )?.fullName
                        }
                      </td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => handleDelete(appointment._id)}
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
        </div>
      </div>
    </>
  );
};

export default Appointments;

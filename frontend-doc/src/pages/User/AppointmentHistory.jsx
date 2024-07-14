import React, { useEffect, useState } from "react";
import {
    doctorAppointmentApi,
    getPaginationAppointmentApi,
    getSingleDoctorApi
} from "../../apis/Api";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // Fetch appointments
  useEffect(() => {
    getPaginationAppointmentApi(currentPage).then((res) => {
      // setAppointments(res.data.appointments);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Fetch doctors
  useEffect(() => {
    // doctorAppointmentApi().then((res) => {
    //   // console.log("This is form here", res.data);
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   const filteredAppointments = res.data.appointments.filter(
    //     (appointment) => appointment.userId === user._id
    //   );
    //   const userHistory = filteredAppointments.map((data) => data.doctorId);

    //   //   console.log(userHistory)
    //   setDoctors(userHistory);
    //   setAppointments(filteredAppointments);
    // });
    // const app = appointments.map((appointment) =>
    //   getSingleDoctorApi(appointment.doctorId).then((res) =>
    //     setDoctorName(res.data.doctor.fullName)
    //   )
    // );

    const fetchAppointments = async () => {
      try {
        const res = await doctorAppointmentApi();
        const user = JSON.parse(localStorage.getItem("user"));
        const filteredAppointments = res.data.appointments.filter(
          (appointment) => appointment.userId === user._id
        );
        setAppointments(filteredAppointments);
        const doctorNamePromises = filteredAppointments.map((appointment) =>
          getSingleDoctorApi(appointment.doctorId)
        );
        console.log(doctorNamePromises)
        const doctorNameResponses = await Promise.all(doctorNamePromises);
        console.log(doctorNameResponses)
        const doctorNamesMap = doctorNameResponses.reduce((acc, res, index) => {
            const doctor = res.data?.doctor;
            if (doctor) {
              acc[filteredAppointments[index].doctorId] = doctor.fullName;
            } else {
              acc[filteredAppointments[index].doctorId] = 'Unknown Doctor';
            }
            return acc;
        });
        console.log(doctorNamesMap)


        setDoctorName(doctorNamesMap);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppointments();
  }, []);

  console.log(doctorName)

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-12 col-lg-12">
            <div className="row">
              <div className="col">
                <h3 style={{ marginTop: 20 }}>Appointments</h3>
              </div>

              <table className="table mt-2">
                <thead className="table-dark">
                  <tr>
                    <th>SN</th>
                    <th>Doctor's Name</th>
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

                      <td>{doctorName[appointment.doctorId] || ""}</td>

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

export default AppointmentHistory;

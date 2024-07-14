import React, { useEffect, useState } from "react";
import { deleteUserApi, getAllUsersApi, getPagination } from "../../apis/Api";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //search query
  const [searchQuery, setSearchQuery] = useState("");
  //filter
  const filteredUsers = users.filter((person) =>
    person.UserName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getPagination(currentPage).then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteUserApi(id).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        window.location.reload();
      }
    });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
                <h3 style={{ marginTop: 20 }}>User</h3>
                <p>Manage the list of users.</p>
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
              <table className="table mt-2">
                <thead className="table-dark">
                  <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.UserName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>

                      <td>
                        <div className="d-flex">
                          <button
                            onClick={() => handleDelete(user._id)}
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
                      className="page-link"
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
                          className="page-link"
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
                      className="page-link"
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

export default Users;

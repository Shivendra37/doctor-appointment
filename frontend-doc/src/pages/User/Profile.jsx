import React from 'react';
import Navbar from '../../components/Navbar';
import '../../profilepage.css';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <Navbar />
          </div>

          <div className="col-md-9 col-lg-10">
            <div className="container" style={{ marginTop: '100px' }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <h4 className="text-center">Profile</h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4 text-center">
                          <img
                            src="../assets/images/profile-placeholder.png"
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fullName"
                              value={user.fullName}
                              readOnly
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={user.email}
                              readOnly
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="phone"
                              value={user.phone}
                              readOnly
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="address">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              value={user.address}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer text-center">
                      <button className="btn btn-primary">Edit Profile</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

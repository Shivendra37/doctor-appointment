import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateUserProfileApi } from '../../apis/Api';
import dummyPhoto from './image.png';
import '../../profilepage.css';
import {useNavigate } from "react-router-dom";


const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    UserName: user.UserName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    avatar: user.avatar,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await updateUserProfileApi(user._id, formData);
      toast.success('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({
        ...formData,
        avatar: reader.result,
      });
    };
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData({
      UserName: user.UserName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      avatar: user.avatar,
    });
    setIsEditing(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className="container profile-container">
          <button
        className="btn btn-dark"
        style={{ position: "absolute", top: "20px", left: "20px" }}
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <h1>Profile</h1>
      <form>
        <div className="form-group">
          <label htmlFor="avatarInput">Profile Picture:</label>
          <input
            id="avatarInput"
            type="file"
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: 'none' }}
            disabled={!isEditing}
          />
          <label htmlFor="avatarInput" className="profile-photo">
            <img
              src={formData.avatar || user.avatar || dummyPhoto}
              alt="Profile"
              className="profile-photo-image"
            />
          </label>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="UserName">User Name:</label>
            <input
              type="text"
              id="UserName"
              name="UserName"
              value={formData.UserName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
            />
          </div>
        </div>
        <div className="button-group">
          {isEditing ? (
            <>
              <button type="button" className="update" onClick={handleSubmit}>Update</button>
              <button type="button" className="cancel" onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button type="button" className="edit" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

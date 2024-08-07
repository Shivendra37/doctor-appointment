import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

//Creating  test
export const testApi = () => Api.get("/test");
//  Creating register api
export const registerApi = (data) => Api.post("/api/user/register", data);

// Create login api
export const loginApi = (data) => Api.post("/api/user/login", data);
//forgot password
export const forgotPasswordApi = (data) =>
  Api.post("/api/user/forgot/password", data);

//reset password
export const resetPasswordApi = (data, token) =>
  Api.put(`/api/user/password/reset/${token}`, data);

export const getAllUsersApi = () => Api.get("/api/user/getUsers");

export const getPagination = (currentPage) =>
  Api.get(`/api/user/getPagination?page=${currentPage}`);

export const getSingleUserApi = (id) => Api.get(`/api/user/getUser/${id}`);

export const deleteUserApi = (id) =>
  Api.delete(`/api/user/deleteUser/${id}`, config);

// Create doctor api
export const createDoctorApi = (formData, user) =>
  Api.post("/api/doctor/create_doctor", formData, config);

//  Get doctor api
export const getAllDoctorsApi = () => Api.get("/api/doctor/get_doctors");

// Get single doctor api
export const getSingleDoctorApi = (id) =>
  Api.get(`/api/doctor/get_doctor/${id}`);

//update doctor
export const updateDoctorApi = (id, formData) =>
  Api.put(`/api/doctor/update_doctor/${id}`, formData, config);

//delete doctor
export const deleteDoctorApi = (id) =>
  Api.delete(`/api/doctor/delete_doctor/${id}`, config);

export const getPaginationApi = (currentPage) =>
  Api.get(`/api/doctor/getPagination?page=${currentPage}`);

// Book Appointment
export const bookappointmentApi = (data) =>
  Api.post(`api/appointment/bookappointment`, data);

export const getAppointments = () => Api.get("/api/appointment/getappointment");

export const deleteAppointmentApi = (id) =>
  Api.delete(`/api/appointment/deleteAppointment/${id}`, config);

export const getPaginationAppointmentApi = (currentPage) =>
  Api.get(`/api/appointment/getPagination?page=${currentPage}`);

// doctor api routes
export const doctorAppointmentApi = () =>
  Api.get(`/api/appointment/doctor/getappointment`);

export const doctorSingleAppointmentApi = (id) =>
  Api.get(`/api/appointment/doctor/appointment/${id}`);

export const updateUserProfileApi = (id, userData) =>
  Api.put(`/api/user/profile/${id}`, userData, config);

// products route
export const createProductApi = (formData, user) =>
  Api.post("/api/products/create", formData, config);

export const deleteProductApi = (id) =>
  Api.delete(`/api/products/${id}`, config);

export const getProductsApi = (id) => Api.get(`/api/products/${id}`, config);

export const getAllProductsApi = () => Api.get(`/api/products`, config);

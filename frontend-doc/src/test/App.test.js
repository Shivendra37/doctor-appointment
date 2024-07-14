import axios from "axios";
import login_mock from "../mock/login_mock";
import doctor_mock from "../mock/doctor_mock";
import user_mock from "../mock/user_mock";

const backendURL = "http://localhost:5000";

describe("App Testing", () => {
  //Login
  it("POST /api/user/login | Login Successful", async () => {
    const response = await axios.post(
      `${backendURL}/api/user/login`,
      login_mock
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.token).toBeDefined();
  });
  //   // Get doctor
  it("GET /api/doctor/get_doctors | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/doctor/get_doctors`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("All doctors fetched successfully!");
    expect(response.data.doctors).toBeDefined();
  });
  // Get User
  it("GET /api/user/getUsers | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/user/getUsers`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Users fetched successfully");
    expect(response.data.users).toBeDefined();
  });
  //Get Appointment
  it("GET /api/appointment/getappointment | Should work", async () => {
    const response = await axios.get(
      `${backendURL}/api/appointment/getappointment`
    );
    expect(response.status).toBe(200);
    expect(response.data.message).toBe(
      "All Appointment fetched successfully!"
    );
    expect(response.data.appointments).toBeDefined();
  });
  //Delete
  it("DELETE /api/user/deleteUser/:id | Should work", async () => {
    const response = await axios.delete(
      `${backendURL}/api/user/deleteUser/65c6f2a0eb97b1ea2f50e48b`
    );
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("User deleted successfully");
    expect(response.data.appointments).toBeDefined();
  });
});

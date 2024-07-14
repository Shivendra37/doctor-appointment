const request = require("supertest");
const app = require("../index");

// Make collection of test cases
describe("API Endpoints Testing", () => {
  // creating a user for testing
  //Changes should be done everytime you try to test
  it("POST /api/user/register | Response with success message", async () => {
    const response = await request(app).post("/api/user/register").send({
      UserName: "Kritika Paudel",
      email: "kritika@gmail.com",
      phoneNumber: "9876543212",
      password: "kritika123",
      confirmPassword: "kritika123",
    });
    if (response.body.success) {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("User created successfully.");
    } else {
      expect(response.body.success).toBe(false);
      expect(response.body.message).toEqual("User already exists.");
    }
  });
  // // Fetching single doctor
  it("/GET /api/doctor/get_doctors/:id | Response should be json", async () => {
    const response = await request(app).get(
      "/api/doctor/get_doctor/65c71354eb97b1ea2f50e4ba"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("doctor");
  });

  // // fetching all doctors
  it("GET /api/doctor/get_doctors | Response should be json", async () => {
    const response = await request(app).get("/api/doctor/get_doctors");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual("All doctors fetched successfully!");
  });

  it("GET /api/user/getUsers | Response should be json", async () => {
    const response = await request(app).get("/api/user/getUsers");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual("Users fetched successfully");
  });

  it("GET /api/appointment/getappointment | Response should be json", async () => {
    const response = await request(app).get("/api/appointment/getappointment");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual(
      "All Appointments fetched successfully!"
    );
  });
});

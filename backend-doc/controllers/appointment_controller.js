const Appointments = require("../model/appointment_model");

//Create Doctor
const bookAppointment = async (req, res) => {
  const { date, time, userId, doctorId, message } = req.body;

  if (!date || !time) {
    return res.json({
      success: false,
      message: "Please select date and time",
    });
  }
  try {
    const newAppointment = new Appointments({
      userId: userId,
      doctorId: doctorId,
      message: message,
      date: date,
      time: time,
    });

    console.log(newAppointment)

    await newAppointment.save();

    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const allAppointments = await Appointments.find({});
    res.json({
      success: true,
      message: "All Appointments fetched successfully!",
      appointments: allAppointments,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const getSingleAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const singleAppointment = await Appointments.findById(appointmentId);
    res.json({
      success: true,
      message: true,
      appointment: singleAppointment,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    await Appointments.findByIdAndDelete(appointmentId);
    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Invalid",
    });
  }
};

const getPagination = async (req, res) => {
  const page = parseInt(req.query.page);
  console.log();
  const pageSize = 5;

  // Calculate the start and end indexes for the requested page
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const appointments = await Appointments.find();

  console.log(startIndex, endIndex);
  // Slice the products array based on the indexes
  const paginatedAppointments = appointments.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(appointments.length / pageSize);

  // Send the paginated products and total pages as the API response
  res.json({ appointments: paginatedAppointments, totalPages });
};

module.exports = {
  bookAppointment,
  getAppointments,
  getSingleAppointment,
  deleteAppointment,
  getPagination,
};

const router = require("express").Router();
const appointmentController = require("../controllers/appointment_controller");

router.post("/bookappointment", appointmentController.bookAppointment);

router.get("/getappointment", appointmentController.getAppointments);

//single doctor
router.get(
  "/getSingleAppointment/:id",
  appointmentController.getSingleAppointment
);

router.delete(
  "/deleteAppointment/:id",
  appointmentController.deleteAppointment
);

router.get("/getPagination", appointmentController.getPagination);


// doctors route
router.get("/doctor/getappointment", appointmentController.getAppointments);
router.get(
  "/doctor/appointment/:id",
  appointmentController.getSingleAppointment
);

module.exports = router;

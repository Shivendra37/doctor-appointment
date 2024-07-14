const router = require('express').Router();
const adminController = require("../controllers/admin_controller")
const {authGuard, authGuardAdmin} = require('../middleware/authGuard');

router.post('/create_doctor',authGuardAdmin, adminController.createDoctor)

router.get("/get_doctors", adminController.getDoctors)

//single doctor
router.get("/get_doctor/:id",adminController.getSingleDoctor)

//Update doctor
router.put("/update_doctor/:id",authGuardAdmin, adminController.updateDoctor)

//delete doctors

router.delete("/delete_doctor/:id",authGuardAdmin, adminController.deleteDoctor)

router.get('/getPagination', adminController.getPagination)

module.exports = router;
// import
const router = require("express").Router();
const user_controller = require("../controllers/user_controller");
const { authGuard } = require("../middleware/authGuard");


// create user api
router.post("/register", user_controller.createUser);

//  task 1: create login api
router.post("/login", user_controller.loginUser);

router.post("/forgot/password", user_controller.forgotPassword);

router.put("/password/reset/:token", user_controller.resetPassword);

router.get("/getUsers", user_controller.getUsers);

router.get("/getUser/:id", user_controller.getSingleUser);

router.delete("/deleteUser/:id", user_controller.deleteUser);

router.get("/getPagination", user_controller.getPagination);

router.put('/profile/:id', authGuard, user_controller.updateUserProfile); // Ensure authGuard is correctly used if required

// exporting
module.exports = router;

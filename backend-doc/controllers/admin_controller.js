const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const Doctors = require("../model/admin_model");
const Users = require("../model/user_model");

//Create Doctor
const createDoctor = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const {
    fullName,
    email,
    password,
    phoneNumber,
    gender,
    address,
    city,
    state,
    qualification,
    servicesOffered,
  } = req.body;
  const { uploadValidId } = req.files;
  if (
    !fullName ||
    !email ||
    !password ||
    !phoneNumber ||
    !gender ||
    !address ||
    !city ||
    !state ||
    !qualification ||
    !servicesOffered ||
    !uploadValidId
  ) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      uploadValidId.path,
      {
        folder: "doctors",
        crop: "scale",
      }
    );

    const newDoctor = new Doctors({
      fullName: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      gender: gender,
      address: address,
      city: city,
      state: state,
      qualification: qualification,
      servicesOffered: servicesOffered,
      uploadValidIdUrl: uploadedImage.secure_url,
    });

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    // when creating a doctor create it as a user too

    await newDoctor.save();

    const newDoc = await Doctors.findOne({ email: email });

    console.log(newDoc._id);

    const createDoctorUser = new Users({
      _id: newDoc._id,
      UserName: newDoc.fullName,
      email: newDoc.email,
      phoneNumber: newDoc.phoneNumber,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
      isDoctor: true,
    });

    await createDoctorUser.save();

    res.json({
      success: true,
      message: "Doctor added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const getDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctors.find({});
    res.json({
      success: true,
      message: "All doctors fetched successfully!",
      doctors: allDoctors,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
//fetch single doctor
const getSingleDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const singleDoctor = await Doctors.findById(doctorId);
    res.json({
      success: true,
      message: true,
      doctor: singleDoctor,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

//update details of doctor
const updateDoctor = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  //destructuring data
  const {
    fullName,
    email,
    phoneNumber,
    gender,
    address,
    city,
    state,
    qualification,
    servicesOffered,
  } = req.body;
  const { uploadValidId } = req.files;

  //validate data
  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !gender ||
    !address ||
    !city ||
    !state ||
    !qualification ||
    !servicesOffered
  ) {
    return res.json({
      success: false,
      message: "Required fields are missing",
    });
  }

  try {
    // case 1: if there is image
    if (uploadValidId) {
      //Upload image to cloudinary
      const uploadedImage = await cloudinary.v2.uploader.upload(
        uploadValidId.path,
        {
          folder: "doctors",
          crop: "scale",
        }
      );
      //Make updated json data
      const updatedData = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        address: address,
        city: city,
        state: state,
        qualification: qualification,
        servicesOffered: servicesOffered,
        uploadValidIdUrl: uploadedImage.secure_url,
      };
      //find details and update
      const doctorId = req.params.id;
      await Doctors.findByIdAndUpdate(doctorId, updatedData);
      res.json({
        success: true,
        message: "Details Updated successfully with image.",
        updateDoctor: updatedData,
      });
    } else {
      //update wthout image.
      const updatedData = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        address: address,
        city: city,
        state: state,
        qualification: qualification,
        servicesOffered: servicesOffered,
      };
      //find details and update
      const doctorId = req.params.id;
      await Doctors.findByIdAndUpdate(doctorId, updatedData);
      res.json({
        success: true,
        message: "Details Updated successfully without image.",
        updateDoctor: updatedData,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};
//delete doctor
const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    await Doctors.findByIdAndDelete(doctorId);
    res.json({
      success: true,
      message: "Doctor deleted successfully",
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
  const doctors = await Doctors.find();

  console.log(startIndex, endIndex);
  // Slice the products array based on the indexes
  const paginatedDoctors = doctors.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(doctors.length / pageSize);

  // Send the paginated products and total pages as the API response
  res.json({ doctors: paginatedDoctors, totalPages });
};
module.exports = {
  createDoctor,
  getDoctors,
  getSingleDoctor,
  updateDoctor,
  deleteDoctor,
  getPagination,
};

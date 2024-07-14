//import

const mongoose = require("mongoose");

//list of function
const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL);
  console.log(`MongoDB is connected at:${connection.host}`.cyan.underline.bold);
};
//export
module.exports = connectDB;

const jwt = require('jsonwebtoken');
 
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // You can adjust the token expiration time as needed
  });
  return token;
};
module.exports = generateToken;
 
 
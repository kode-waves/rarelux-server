const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Secret key for signing the token (replace with your own secret key)
const secretKey = process.env.SECRET_KEY;

// Generate JWT token based on user's Ethereum address
const generateToken = (ethereumAddress) => {
  // Payload data for the token (include user's Ethereum address)
  const payload = {
    ethereumAddress: ethereumAddress
    // Add other relevant data if needed
  };

  // Generate and sign the token
  const token = jwt.sign(payload, secretKey); // Token 
  // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
  console.log("token---------", token)
  return token;
};

module.exports = generateToken
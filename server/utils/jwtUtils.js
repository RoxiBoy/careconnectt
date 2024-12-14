const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const payload = { userId };
  const secretKey = 'yourSecretKey'; // Use an environment variable for this in production
  const options = { expiresIn: '7d' }; // Token will expire in 7 days

  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  const secretKey = 'yourSecretKey'; // Use an environment variable for this in production

  return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };

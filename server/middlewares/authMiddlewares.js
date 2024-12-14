const { verifyToken } = require('../utils/jwtUtils');

const authenticate = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;

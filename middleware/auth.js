const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Something wrong with auth middleware');
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

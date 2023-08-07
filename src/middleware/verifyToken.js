const jwt = require('jsonwebtoken')
const {userBaru} = require('../models')

const verifyToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers['authorization'];

    if (!jwtToken) {
      return res.status(400).send({
        message: 'No token provided!'
      });
    }

    const token = jwtToken.split(" ")[1];

    try {
      // Verify the JWT token with the JWT_SECRET from .env
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verify; // Save the decoded token from "verify" variable in the request for future use
      next();
    } catch (error) {
      return res.status(403).send({
        message: 'Authentication failed - forbidden access!'
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error',
      data: error
    });
  }
};

module.exports = {verifyToken}
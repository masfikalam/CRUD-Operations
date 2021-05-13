const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split("_")[1];
    const decode = jwt.verify(token, process.env.SECRETKEY);
    req.username = decode.username;
    req._id = decode._id;
    next();
  } catch (err) {
    next(err.message);
  }
};

module.exports = verifyToken;

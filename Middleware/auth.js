const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }
  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded;
  next();
};

module.exports = Auth;

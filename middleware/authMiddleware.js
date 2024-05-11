const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("middleware token == ", token);
  jwt.verify(token, "token", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access forbidden. Only admin users allowed." });
  }
}

function isUser(req, res, next) {
  if (req.user && (req.user.role === "admin" || req.user.role === "user")) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access forbidden. Only authenticated users allowed." });
  }
}

module.exports = {
  authenticateJWT,
  isAdmin,
  isUser,
};

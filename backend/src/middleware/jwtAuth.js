const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  // Updated function name
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authentication failed." });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = jwtAuth;

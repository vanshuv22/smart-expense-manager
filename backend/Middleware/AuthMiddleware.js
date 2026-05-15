const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // console.log("trigger", req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("token", token);
    console.log("secret", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded : ", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token expired or invalid",
    });
  }
};

module.exports = authMiddleware;

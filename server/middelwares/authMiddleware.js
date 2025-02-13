const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
module.exports = authMiddleware;

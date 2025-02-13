const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserInt = require("../schemas/userSchema");
const authMiddleware = require("../middelwares/authMiddleware");
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(403).json({ message: "All fields are required" });
  }
  try {
    const user = await UserInt.findOne({ email: email });
    console.log(user);
    if (user) {
      return res
        .status(403)
        .json({ message: "User already exists please login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserInt({ name, email, password: hashedPassword });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token: token, ...newUser.toObject() });
  } catch (e) {
    res.status(500).json({ message: "server error:" + e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "All fields are required" });
  }
  try {
    const user = await UserInt.findOne({ email: email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "user not found please register" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({ message: "invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const requiredUser = await UserInt.findOne({ email })
      .select("-password ")
      .lean();

    res.status(200).json({ token: token, ...requiredUser });
  } catch (e) {
    res.status(500).json({ message: "server error:" + e.message });
  }
});
router.get("/user", authMiddleware, async (req, res) => {
  console.log(req.user);
  const user = await UserInt.findById(req.user.id).select("-password").lean();
  res.status(200).json(user);
});

module.exports = router;

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

const signup = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = User.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    console.log("USER====", user);

    const token = generateToken(user);
    res.status(201).json({
      message: "Signup Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  signin,
};

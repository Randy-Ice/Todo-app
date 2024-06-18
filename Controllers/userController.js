const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

//= Generate token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

const registration = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message: "Please enter a strong password for security, symbols ok",
    });
  }

  try {
    const isNewUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (isNewUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });
    const token = genToken(user.id);
    return res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  const token = genToken(user.id);
  res.status(200).json({ token: token });
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registration,
  login,
};

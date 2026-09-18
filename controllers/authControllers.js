import User from '../models/user.js'
import { generateToken } from '../utils/GenerateToken.js';




// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = generateToken(user._id);

    res.json({token});
  } catch (error) {
    next(error);
  }
};

// PROFILE
export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      user,
    });
  } catch (error) {
    next(error);
  }
};